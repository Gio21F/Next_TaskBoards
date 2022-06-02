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
            className='overflow-hidden flex items-center cursor-pointer h-14 p-2 bg-zinc-700 rounded-md'
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <h1 className='w-full text-lg truncate'> { entry.title } </h1>
        </div>
    )
}
