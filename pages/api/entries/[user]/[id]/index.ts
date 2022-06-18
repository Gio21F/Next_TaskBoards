import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../../database';
import { IEntry, IList } from '../../../../../interfaces'
import { Entry, List } from '../../../../../models';

type Data = 
    | { message: string }
    | IEntry
    | { task: IEntry, list: IList }

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
    const { id } = req.query;
    try {
        await db.connect();
        const task= await Entry.findById( id );
        if ( !task ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay una tarea con el ID: ' + id })
        }
        const list = await List.findById( task.list );
        if ( !list ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay una lista con el ID: ' + task.list })
        }
        await db.disconnect();
        res.status(200).json({ task, list });
    }
    catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong, please try again later' });
    }
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
            list = entryToUpdate.list
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