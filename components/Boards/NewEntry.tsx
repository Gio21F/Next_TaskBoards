import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { BiPlus } from 'react-icons/bi'
import { toast } from 'react-toastify';
import { BoardsContext } from '../../context/boards';
import { optionsToast } from '../../utils';

interface Props {
    status: string
}
interface FormData {
    title: string
}

export const NewEntry = ({ status }:Props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const { createEntry } = useContext(BoardsContext);
    
    const handleCreateEntry = async({ title }:FormData) => {
        const { hasError, message } = await createEntry( title, status )
        if (hasError) {
            toast.error(message, optionsToast)
        } else {
            toast.success('Tarea creada correctament', optionsToast)
        }
        reset()
    }
    return (
        <div className='w-full py-2 flex flex-col bottom-2 mt-2 text-black dark:text-white'>
            <form className='flex' onSubmit={ handleSubmit( handleCreateEntry ) } noValidate>
                <input 
                    className='rounded-lg p-2 bg-transparent 
                    focus:caret-indigo-500 border-2 border-indigo-500/50
                    font-semibold' 
                    type="text" 
                    placeholder='Nueva Tarea' 
                    { ...register('title', {
                        required: 'Este campo es requerido',
                        minLength: { value: 4, message: 'Mínimo 4 caracteres' }
                    })}
                />
                <button className='ml-2 rounded-lg border-2 border-indigo-500/40'><BiPlus className='h-8 w-8' /></button>
            </form>
            { errors.title && <p className='text-red-500 mt-1'>{ errors.title.message }</p> }
        </div>
    )
}
