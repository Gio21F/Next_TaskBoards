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
    }

    const onDragEnd = () => {
        endDragging();
    }
    return (
        <div
            className='overflow-hidden flex items-center flex-col justify-center
                cursor-pointer h-[80px] p-2 bg-zinc-700 rounded-md space-y-1'
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <h1 className='w-full text-lg truncate'> { entry.title } </h1>
            <div className='flex place-content-end w-full'>
                <span className='text-xs text-gray-300'>{ dateFunctions.getFormatDistanceToNow( entry.createdAt! ) }</span>
            </div>
        </div>
    )
}
