import { createContext } from 'react';


interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    currentTheme: 'dark' | 'light';

    // Methods
    closeSideMenu: () => void;
    openSideMenu: () => void;

    setIsAddingEntry: (isAdding: boolean) => void;

    endDragging: () => void;
    startDragging: () => void;

    changeCurrentTheme: (newTheme: 'dark' | 'light') => Promise<{ hasError: boolean, message?: string }>;
}


export const UIContext = createContext({} as ContextProps );