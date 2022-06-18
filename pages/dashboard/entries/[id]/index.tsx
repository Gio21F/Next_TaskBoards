import { GetServerSideProps } from 'next'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { getSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { BiSave, BiTrash } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { Layout } from '../../../../components/layouts'
import { BoardsContext } from '../../../../context/boards'
import { IEntry, IList } from '../../../../interfaces'
import { optionsToast } from '../../../../utils'
import { dbEntries } from '../../../../database'

type FormData = {
    title: string
    description: string
}

interface Props {
    task: IEntry
    list: IList
}

const EditTask = ({ task, list }:Props) => {
    const { updateEntry } = useContext( BoardsContext )
    const [isSaving, setIsSaving] = useState(false);

    const { register, handleSubmit, formState:{ errors } } = useForm<FormData>({
        defaultValues: task
    })

    const onSubmit = async( form:FormData ) => {
        setIsSaving(true)
        try {
            const { hasError, message } = await updateEntry( { ...task, ...form } )
            if (hasError) return toast.error(message, optionsToast)
            toast.success('La tarea se actualizó correctamente', optionsToast)
            
        } catch (error) {
            setIsSaving(false)
            toast.error("Algo salio mal, intentelo mas tarde", optionsToast)
        }
        setIsSaving(false)
    }

    return (
        <Layout title={ task?.title }>
            <div className='w-full flex items-center justify-center'>
                <div className='flex flex-col min-w-[300px] max-w-[700px] justify-center items-center mt-12 dark:text-white/80 text-black  py-2 rounded-md'>
                    <h1 className='text-2xl px-4 font-semibold w-full'>Editando tarea desde la lista { list?.title }</h1>
                    <button 
                        className='absolute bottom-4 right-4 rounded-full 
                        w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-red-500'
                        title='Eliminar tarea'
                    >
                        <BiTrash className='h-6 w-6' />
                    </button>
                    <form onSubmit={ handleSubmit( onSubmit ) } className='w-full flex flex-col mt-12 space-y-4 h-full px-4'>
                        <label className='font-semibold'>Titulo de la tarea</label>
                        <input 
                            type="text" 
                            className='w-full bg-transparent rounded-xl p-2 border-2 
                            font-semibold border-indigo-500/40 caret-indigo-500/50'  
                            placeholder='Título de la tarea'
                            { ...register('title', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                                maxLength: { value: 100, message: 'Máximo 30 caracteres' }
                            })}
                        />
                        <label className='font-semibold'> Descripción</label>
                        <textarea
                            className='w-full bg-transparent rounded-xl p-2 border-2 
                            font-semibold border-indigo-500/40 caret-indigo-500/50'
                            placeholder='Descripción de la tarea'
                            rows={ 5 }
                            maxLength={ 1000 }
                            { ...register('description', {
                                required: 'Este campo es requerido',
                                maxLength: { value: 1000, message: 'Máximo 1000 caracteres' },
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                            })}
                        >

                        </textarea>
                        <button 
                            className='absolute bottom-4 right-24 rounded-full 
                            w-10 h-10 sm:w-14 disabled:opacity-70 sm:h-14 flex items-center justify-center bg-green-500'
                            title='Guardar'
                            type="submit"
                            disabled={ isSaving }
                            
                            >
                            <BiSave className='h-6 w-6' />
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default EditTask

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session: any = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            }
        }
    }

    const { id } = query
    const data = await dbEntries.getEntryById( id as string )
    if (!data?.task) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        }
    }
    return {
        props: {
            task: data.task,
            list: data.list
        }
    }

}