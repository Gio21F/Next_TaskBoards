import { FC, useReducer, useEffect } from 'react';
import { tasksApi } from '../../api';
import { IEntry } from '../../interfaces';
import { toast } from 'react-toastify';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: IEntry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

const optionsToast: any= {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const EntriesProvider:FC = ({ children }) => {
    const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );

    const addNewEntry = async( description: string ) => {
        const { data } = await tasksApi.post<IEntry>('/entries', {
            description
        })
        dispatch({ type: '[Entry] Entry-add', payload: data });
    }

    const toastSuccess = ( message: string ) =>
        toast.success(message, optionsToast); 
    
    const toastError = ( message: string ) =>
        toast.error(message, optionsToast); 

    const updateEntry = async( { _id, description, status }: IEntry, showSnackbar = false) => {
        try {
            const { data } = await tasksApi.put<IEntry>(`/entries/${_id}`, { description, status });
            dispatch({ type: '[Entry] Entry-Updated', payload: data });
            if ( showSnackbar ) toastSuccess('Update Successfully!') 
        } catch (error) {
            toastError("Update Failed!")
        }
    }

    const refreshEntries = async() => {
        const { data } =  await tasksApi.get<IEntry[]>('/entries')    
        dispatch({ type: '[Entry] Entries-Loaded', payload: data });
    }

    useEffect( () => {
        refreshEntries();
    }, [] );

    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};

