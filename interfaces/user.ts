import { IBoard } from "./";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    image?: string;
    status?: boolean;
    role: 'admin' | 'user';
    boards?: IBoard[];
    createdAt?: string;
    updatedAt?: string;
}