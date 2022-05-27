import { IEntry } from "."

export interface IList {
    _id?: string;
    title: string;
    entries: IEntry[];
    createdAt?: string;
    updatedAt?: string;
}