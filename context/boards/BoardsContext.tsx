import { createContext } from 'react';
import { IBoard, IEntry, IList } from '../../interfaces';


interface ContextProps {
    boards: IBoard[];
    lists: IList[];
    entries: IEntry[];

    // Actions Boards
    getBoardsByUser: (_id:string) => void;
    createBoard: ( title: string ) => Promise<{ hasError: boolean; message?: string }>;

    // Actions Lists
    getAllLists: (_id:string) => void;
    createList: ( title: string, boardId: string ) => Promise<{ hasError: boolean; message?: string }>;

    // Actions Entries
    getAllEntries: (_id:string) => void;
    createEntry: ( title: string, list: string ) => Promise<{ hasError: boolean; message?: string }>;
    updateEntry: ( entry:IEntry ) => Promise<{ hasError: boolean; message?: string }>;
}


export const BoardsContext = createContext({} as ContextProps );