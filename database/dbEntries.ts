import { isValidObjectId } from 'mongoose';
import { IEntry, IList } from '../interfaces';
import { Entry, List } from '../models';
import { db } from './';

export const getEntryById = async( id: string ): Promise<{ task: IEntry, list:IList } | null> => {

    if ( !isValidObjectId(id) ) return null;

    try {
        await db.connect();
        const task = await Entry.findById(id).lean(); //Cuando sabemos que trabajaremos con menos informacion
        if ( !task ) {
            await db.disconnect();
            return null;
        }
        const list = await List.findById(task.list);
        if ( !list ) {
            await db.disconnect();
            return null;
        }

        await db.disconnect();
    
        return JSON.parse( JSON.stringify({ task, list }) );
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return null;
    }

}