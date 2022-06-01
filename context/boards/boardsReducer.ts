import { IBoard, IList } from "../../interfaces";
import { BoardsState } from "./BoardsProvider";

type BoardsActionType = 
    | { type: '[Board] Board-add', payload: IBoard }
    | { type: '[Board] Boards-get', payload: IBoard[]  }
    | { type: '[Board] Lists-get', payload: IList[] }
    | { type: '[Board] List-add', payload: IList }

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
    default:
        return state;
    }
    
}