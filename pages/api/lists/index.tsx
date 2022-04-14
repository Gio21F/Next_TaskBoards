import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IList, List, Board } from '../../../models';

type Data = 
    | { message: string }
    | IList[]
    | IList

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getLists( res );

        case 'POST':
            return postList( req, res );
            
        default:
            return res.status(400).json({ message: 'Endpoint not found' });
    }
}

const getLists = async( res: NextApiResponse<Data> ) => {
    try {
        await db.connect();
        const lists = await Board.find({}, { list: true, _id: false });
        console.log(lists);
        await db.disconnect();
    
        return res.status(200).json( {
            message: 'Lists found',
        } );
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
}

const postList = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    // const { title = '' } = req.body;

    // const newList= new Board({
    //     title,
    //     createdAt: Date.now(),
    // });

    // try {
    //     await db.connect();
    //     await newList.save({});
    //     await db.disconnect();

    //     return res.status(201).json( newBoard );
        
    // } catch (error) {
    //     await db.disconnect();
    //     console.log(error);
    //     return res.status(500).json({ message: 'Something went wrong, please try again later' });
    // }
    
}