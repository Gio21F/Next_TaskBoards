import { useRouter } from 'next/router';
import React, { useContext, DragEvent } from 'react'
import { UIContext } from '../../context/ui';
import { IEntry } from '../../interfaces'
import { dateFunctions } from '../../utils';

interface Props {
    entry: IEntry
}

export const EntryCard = ({ entry }:Props) => {

    const { startDragging, endDragging } = useContext( UIContext );
    const router = useRouter()
    
    const onDragStart = ( event: DragEvent ) => {
        event.dataTransfer.setData('text', entry._id! );
        startDragging();
        // console.log("Iniciando arrasto");
    }

    const onDragEnd = () => {
        // console.log("Finalizando arrasto");
        endDragging();
    }
    return (
        <div
            className='overflow-hidden flex items-center flex-col justify-center
                cursor-pointer h-[80px] p-2 bg-slate-300 dark:bg-slate-800 rounded-md space-y-1'
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
            onClick={ () => router.push(`/dashboard/entries/${entry._id}`) }
        >
            <h1 className='w-full text-lg truncate'> { entry.title } </h1>
            <div className='flex place-content-end w-full'>
                <span className='text-xs text-black dark:text-gray-300'>{ dateFunctions.getFormatDistanceToNow( entry.createdAt! ) }</span>
            </div>
        </div>
    )
}
