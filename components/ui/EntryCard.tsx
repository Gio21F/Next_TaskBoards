import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../context/ui/UIContext';
import { Entry } from '../../interfaces';
interface Props {
    entry: Entry;
}

export const EntryCard:FC<Props>= ({ entry }) => {

    const { startDragging, endDragging } = useContext( UIContext );

    const onDragStart = ( event: DragEvent ) => {
        event.dataTransfer.setData('text', entry._id );

        startDragging();
    }

    const onDragEnd = () => {
        endDragging();
    }


  return (
    <div
        className='mb-2 p-2 bg-zinc-700 rounded-md'
        // Eventos de drag
        draggable
        onDragStart={ onDragStart }
        onDragEnd={ onDragEnd }
    >  
        <p className='text-base'>{ entry.description }</p>
        <p className='text-right mt-2'>3h ago</p>
    </div>
    
  )
};