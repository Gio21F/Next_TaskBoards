import { Entry } from "."

export interface List {
    _id: string;
    title: string;
    createdAt: number;
    entries: Entry[];
}