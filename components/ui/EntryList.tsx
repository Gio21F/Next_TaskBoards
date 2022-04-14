import { FC, useContext, useMemo, DragEvent } from 'react';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { Entry, EntryStatus } from '../../interfaces';
import { EntryCard } from './';

interface Props {
    status: EntryStatus;
}


export const EntryList:FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext( EntriesContext );
    const { isDragging, endDragging } = useContext( UIContext );

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries, status ] );

    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault();
    }

    const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
        const id = event.dataTransfer.getData('text');
        
        const entry = entries.find( e => e._id === id )!;
        entry.status = status;
        updateEntry( entry );
        endDragging();
    }

      
    return (
        //   TODO: aquí haremos drop
        <div
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className={ isDragging ? 'h-[90%] pb-2' : '' }
        >   
            <div
                className='overflow-scroll scrollbar-hide 
                    my-[10px] mx-[15px] py-[3px] px-[5px]'
                style={{ height: 'calc(100vh - 180px )', maxHeight: 'calc(100vh - 180px )' }}
            >

                <div style={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}> 
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard key={ entry._id } entry={ entry } />
                        ))
                    }
                </div>

            </div>
        </div>
    )
};