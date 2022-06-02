import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { IList } from '../../../../interfaces';
import { List } from '../../../../models';
import { isValidObjectId } from 'mongoose';

type Data = 
    | { message: string }
    | IList[]
    | IList

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getLists( req, res );

        case 'POST':
            return postList( req, res );
            
        default:
            return res.status(400).json({ message: 'Endpoint not found' });
    }
}

const getLists = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { user = '' } = req.query;

    try {
        await db.connect();
        const lists = await List.find({ user });
        await db.disconnect();
    
        return res.status(200).json( lists );

    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
}

const postList = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { user = '' } = req.query;
    const { title = '', board = '' } = req.body;

    if ( !isValidObjectId(user) ) return res.status(400).json({ message: 'Invalid user id' });
    if ( !isValidObjectId(board) ) return res.status(400).json({ message: 'Invalid board id' });

    const newList= new List({
        title,
        user,
        board,
    });

    try {
        await db.connect();
        const lists = await List.find({ user, board }).count();
        if ( lists >= 5 ) return res.status(400).json({ message: 'No puedes crear mas de 5 listas' });
        await newList.save();
        await db.disconnect();

        return res.status(201).json( newList );
        
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
    
}