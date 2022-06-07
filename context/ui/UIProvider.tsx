import { FC, useEffect, useReducer } from "react";
import { UIContext } from "./";
import { uiReducer } from "./";

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    currentTheme: "dark" | "light";
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
    currentTheme: "light"
}

export const UIProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE );

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' });
    }

    const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' })

    const setIsAddingEntry = ( isAdding: boolean ) => {
        dispatch({ type:'UI - Set isAddingEntry', payload: isAdding });
    }

    const startDragging = () => {
        dispatch({ type: 'UI - Start Dragging' });
    }

    const endDragging = () => {
        dispatch({ type: 'UI - End Dragging' });
    }

    const changeCurrentTheme = async( newTheme: 'dark' | 'light' ): Promise<{hasError: boolean; message?: string}> => {
        try {
            localStorage.setItem('theme', newTheme);
            dispatch({ type: 'UI - Set Theme', payload: newTheme });
            return { hasError: false };
        } catch (error) {
            return { 
                hasError: true, 
                message: 'No se pudo cambiar el tema' 
            };
        }
    }

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            if (theme === 'light') {
                document.body.classList.remove('dark');
            }
            else {
                document.body.classList.add('dark');
            }
            dispatch({ type: 'UI - Set Theme', payload: theme as 'dark' | 'light' });
        }

    } , [state.currentTheme]);

    return (
        <UIContext.Provider value={{
            ...state,

            // Methods
            closeSideMenu,
            openSideMenu,
            
            setIsAddingEntry,

            endDragging,
            startDragging,

            changeCurrentTheme
        }}>
            {children}
        </UIContext.Provider>
    )
}