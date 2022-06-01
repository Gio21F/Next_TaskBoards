import axios from "axios";
import { FC, useContext, useEffect, useReducer } from "react";
import { tasksApi } from "../../api";
import { IBoard, IEntry, IList } from "../../interfaces";
import { AuthContext } from "../auth";
import { BoardsContext } from "./BoardsContext";
import { boardsReducer } from "./boardsReducer";

export interface BoardsState {
    boards: IBoard[];
    lists: IList[];
    entries: IEntry[];
}

const Boards_INITIAL_STATE: BoardsState = {
    boards: [],
    lists: [],
    entries: [],
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

export const BoardsProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer( boardsReducer , Boards_INITIAL_STATE );
    const { user } = useContext(AuthContext);

    const createBoard = async( title: string ): Promise<{hasError: boolean; message?: string}> => {
        const { _id } = user!
        try {
            const { data } = await tasksApi.post<IBoard>( `/boards/${ _id }`, { title } );
            dispatch( { type: '[Board] Board-add', payload: data });
            return { hasError: false };
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const getBoardsByUser = async(_id:string) => {
        const { data } = await tasksApi.get<IBoard[]>( `/boards/${ _id }` );
        dispatch( { type: '[Board] Boards-get', payload: data });
    }

    // Functions Lists
    const getAllLists = async(_id:string) => {
        const { data } = await tasksApi.get<IList[]>( `/lists/${ _id }` );
        dispatch( { type: '[Board] Lists-get', payload: data });
    }
    const createList = async( title: string, board: string ): Promise<{hasError: boolean; message?: string}> => {
        const { _id } = user!
        try {
            const { data } = await tasksApi.post<IList>( `/lists/${ _id }`, { title, board } );
            dispatch( { type: '[Board] List-add', payload: data });
            return { hasError: false };
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    // Functions Entries

    useEffect(() => {
        if (user) {
            const { _id } = user!
            getBoardsByUser(_id!);
            getAllLists(_id!);
        }
    }, [ user ]);

    return (
        <BoardsContext.Provider value={{
            ...state,

            // Methods
            createBoard,
            getBoardsByUser,
            getAllLists,
            createList,
        }}>
            {children}
        </BoardsContext.Provider>
    )

}