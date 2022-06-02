import { IBoard, IEntry, IList } from "../../interfaces";
import { BoardsState } from "./BoardsProvider";

type BoardsActionType = 
    | { type: '[Board] Board-add', payload: IBoard }
    | { type: '[Board] Boards-get', payload: IBoard[]  }
    | { type: '[Board] Lists-get', payload: IList[] }
    | { type: '[Board] List-add', payload: IList }
    | { type: '[Board] Entry-get', payload: IEntry[] }
    | { type: '[Board] Entry-add', payload: IEntry }
    | { type: '[Board] Entry-update', payload: IEntry }

export const boardsReducer = ( state: BoardsState, action: BoardsActionType ): BoardsState => {
    
    switch (action.type) {
        case '[Board] Board-add':
            return {
                ...state,
                boards: [...state.boards, action.payload]
            }
        case '[Board] Boards-get':
            return {
                ...state,
                boards: action.payload
            }
        case '[Board] Lists-get':
            return {
                ...state,
                lists: action.payload
            }
        case '[Board] List-add':
            return {
                ...state,
                lists: [...state.lists, action.payload]
            }
        case '[Board] Entry-get':
            return {
                ...state,
                entries: action.payload
            }
        case '[Board] Entry-add':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case '[Board] Entry-update':
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if ( entry._id === action.payload._id ) {
                        entry.title = action.payload.title;
                        entry.description = action.payload.description;
                        entry.list = action.payload.list;
                    }
                    return entry;
                } )
            }
    default:
        return state;
    }
    
}