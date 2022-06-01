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
}


export const BoardsContext = createContext({} as ContextProps );