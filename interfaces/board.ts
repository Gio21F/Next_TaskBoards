import { List } from "./"

export interface Boards {
    _id: string;
    boards: Board[];
}

export interface Board {
    _id: string;
    title: string;
    createdAt: number;
    list: List[];
}
