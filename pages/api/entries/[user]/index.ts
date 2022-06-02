import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { db } from '../../../../database';
import { IEntry } from '../../../../interfaces';
import { Entry } from '../../../../models';


type Data = 
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'GET':
            return getEntries( req, res );

        case 'POST':
            return postEntry( req, res );
            
        default:
            return res.status(400).json({ message: 'Endpoint not found' });
    }
}


const getEntries = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { user = '' } = req.query;

    try {
        await db.connect();
        const entries = await Entry.find({user}).sort({ createdAt: 'ascending' });
        await db.disconnect();
    
        return res.status(200).json( entries );
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
}


const postEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { title = '', list = '' } = req.body;
    const { user = '' } = req.query;

    if ( !isValidObjectId(user) ) return res.status(400).json({ message: 'Invalid user id' });
    if ( !isValidObjectId(list) ) return res.status(400).json({ message: 'Invalid list id' });
    if ( !title ) return res.status(400).json({ message: 'Title is required' });

    const newEntry = new Entry({
        title,
        user,
        list,
    });

    try {
        await db.connect();
        const entries = await Entry.find({user}).count();
        if ( entries >= 10 ) return res.status(400).json({ message: 'Solo puedes tener 10 tareas por lista' });
        await newEntry.save();
        await db.disconnect();

        return res.status(201).json( newEntry );
        
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }

}