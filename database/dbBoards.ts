import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { IBoard } from '../interfaces';
import { Board } from '../models';

export const getBoardByID = async ( id: string ) => {
    if (!isValidObjectId(id)) {
        return null;
    }
    try {
        await db.connect();
        const board = await Board.findById(id).lean();
        await db.disconnect();

        if ( !board ) {
            return null;
        }
    
        return JSON.parse(JSON.stringify(board));

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getBoardsByUser = async ( user: string ): Promise<IBoard[] | null>=> {
    if (!isValidObjectId(user)) {
        console.log('Invalid user id');
        return null;
    }

    try {
        await db.connect();
        const boards = await Board.find({user}).sort({ createdAt: 'ascending' }).populate('list');
        await db.disconnect();

        if ( !boards ) {
            return [];
        }

        return JSON.parse(JSON.stringify(boards));
    } catch (error) {
        console.log(error);
        return null;
    }
}