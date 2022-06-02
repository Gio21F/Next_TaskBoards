import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../../database';
import { IEntry } from '../../../../../interfaces'
import { Entry } from '../../../../../models';

type Data = 
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getEntryById( req, res );
        case 'PUT':
            return updateEntry( req, res );

        case 'DELETE':
            return deleteEntry( req, res );
            
        default:
            return res.status(400).json({ message: 'Endpoint not found' });
    }
}

const getEntryById = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

}
const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query;
    try {
        await db.connect();
        const entryToUpdate = await Entry.findById( id );

        if ( !entryToUpdate ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay una tarea con el ID: ' + id })
        }
        const {
            description = entryToUpdate.description,
            title = entryToUpdate.title,
            list = entryToUpdate.list,
        } = req.body;

        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, title, list }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json( updatedEntry! );

    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
}
const deleteEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

}