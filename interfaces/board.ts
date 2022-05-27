import { IList } from "./"

export interface IBoard {
    _id?: string;
    title: string;
    list: IList[];
    createdAt?: string;
    updatedAt?: string;
}
