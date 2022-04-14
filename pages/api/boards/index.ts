import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IBoard, Board } from '../../../models';

type Data = 
    | { message: string }
    | IBoard[]
    | IBoard

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getBoards( res );

        case 'POST':
            return postBoard( req, res );
            
        default:
            return res.status(400).json({ message: 'Endpoint not found' });
    }
}

const getBoards = async( res: NextApiResponse<Data> ) => {
    try {
        await db.connect();
        const boards = await Board.find().sort({ createdAt: 'ascending' });
        await db.disconnect();
    
        return res.status(200).json( boards );
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
}

const postBoard = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { title = '' } = req.body;

    const newBoard = new Board({
        title,
        createdAt: Date.now(),
    });

    try {
        await db.connect();
        await newBoard.save();
        await db.disconnect();

        return res.status(201).json( newBoard );
        
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
}