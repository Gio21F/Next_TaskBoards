import type {NextApiResponse, NextApiRequest} from 'next'
import { db } from '../../../database';
import { IBoard } from '../../../interfaces';
import { Board } from '../../../models';
import { isValidObjectId } from 'mongoose';


type Data = 
    | { message: string }
    | IBoard[]
    | IBoard

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getBoards( res, req );

        case 'POST':
            return postBoard( res, req );
            
        default:
            return res.status(400).json({ message: 'Endpoint not found' });
    }
}

const getBoards = async( res: NextApiResponse<Data>, req: NextApiRequest ) => {
    const { user = '' } = req.body;
    if ( !user ) return res.status(400).json({ message: 'User not logged - User is required' });
    try {
        await db.connect();
        const boards = await Board.find({user}).sort({ createdAt: 'ascending' });
        await db.disconnect();
        return res.status(200).json( boards );
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
}

const postBoard = async( res: NextApiResponse<Data>, req: NextApiRequest ) => {
    
    const { title = '', user = ''} = req.body;

    if ( !isValidObjectId(user) ) return res.status(400).json({ message: 'Invalid user id' });
    if ( !title ) return res.status(400).json({ message: 'Title is required' });

    const newBoard = new Board({
        title,
        user,
    });

    try {
        await db.connect();
        const boards = await Board.find({user}).count();
        if ( boards >= 10 ) return res.status(400).json({ message: 'You can only have 10 boards' });
        await newBoard.save();
        await db.disconnect();

        return res.status(201).json( newBoard );
        
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
}