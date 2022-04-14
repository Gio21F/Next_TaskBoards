import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
    
    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext);


    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    const onSave = () => {

        if ( inputValue.length === 0 ) return;

        addNewEntry( inputValue );
        setIsAddingEntry( false );
        setTouched( false );
        setInputValue('');

    }


  return (
      <div className='mb-2 px-5'>
        
        {
            isAddingEntry 
            ? (
                <>
                    <input
                        className={`${ touched && inputValue.length === 0 ? 'border-2 border-red-600' : 'border-2 border-green-700/50' } mt-2 mb-1 w-full bg-transparent/50 text-white rounded-md p-2 `}
                        placeholder='Nueva entrada'
                        autoFocus
                        multiple
                        value={ inputValue }
                        onChange={ onTextFieldChanged }
                        onBlur={ () => setTouched( true ) }
                    />

                    <div className='flex justify-between'>

                        <button
                            className='mr-2 flex items-center justify-center'
                            onClick={() => setIsAddingEntry( false ) }
                        >
                            Cancelar
                        </button>

                        <button
                            className='mr-2 flex items-center justify-center'
                            onClick={ onSave }
                        >
                            Guardar
                        </button>
                    </div>
                </>
            )

            : (
                <button
                    className='flex items-center p-2 w-full h-8 hover:bg-zinc-700 rounded-md'
                    onClick={() => setIsAddingEntry( true ) }
                >
                    Añada una tarjeta
                </button>
            )

        }
        
      
      </div>
  )
};