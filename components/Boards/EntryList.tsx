import React, { DragEvent, useContext, useMemo } from 'react'
import { toast } from 'react-toastify';
import { BoardsContext } from '../../context/boards';
import { UIContext } from '../../context/ui';
import { optionsToast } from '../../utils';
import { EntryCard } from './EntryCard';

interface Props {
    status: string;
}

export const EntryList = ({ status }:Props) => {
    const { isDragging, endDragging } = useContext( UIContext );
    const { entries, updateEntry } = useContext( BoardsContext );

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.list === status ), [ entries, status ] ).reverse();
    
    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault();
    }

    const onDropEntry = async( event: DragEvent<HTMLDivElement> ) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find( entry => entry._id === id );
        if ( entry ) {
            entry.list = status;
            const { hasError, message } = await updateEntry( entry );
            if (hasError) {
                toast.error(message, optionsToast)
            }
            return endDragging();
        }
        endDragging();
    }
    return (
        <div
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className={ isDragging ? 'bg-zinc-700/30' : '' }
        >
            <div style={{ height: 'calc( 100vh - 350px )', maxWidth: 280 }} className='mt-2 overflow-y-scroll scrollbar-hide'>
                <div
                    className='space-y-2'
                    style={{
                        opacity: isDragging ? 0.5 : 1, 
                        transition: 'all .3s',
                    }}
                >
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard key={ entry._id } entry={ entry } />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
