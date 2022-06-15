import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiSave, BiTrash } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { Layout } from '../../../../components/layouts'
import { BoardsContext } from '../../../../context/boards'
import { IEntry, IList } from '../../../../interfaces'
import { optionsToast } from '../../../../utils'

type FormData = {
    title: string
    description: string
}

interface Props {
    task: IEntry
    list: IList
}

const EditTask = ({ task, list }:Props) => {
    // const router = useRouter()
    const { entries, lists, updateEntry } = useContext( BoardsContext )
    // const { id } = router.query
    // const task = useMemo( () => entries.find( entry => entry._id === id )!, [ entries, id ] )
    // const list = useMemo( () => lists.find( list => list._id === task?.list ) , [ task, lists ] )
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
    }

    // console.log(task)
    return (
        <Layout title={ task?.title }>
            <div className='dark:text-white/80 text-black'>

                <h1 className='text-2xl font-semibold'>Editando tarea desde la lista { list?.title }</h1>
                <button 
                    className='absolute bottom-4 right-4 rounded-full 
                    w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-red-500'
                    title='Eliminar tarea'
                >
                    <BiTrash className='h-6 w-6' />
                </button>

                <div className='flex w-full justify-center items-center mt-12'>
                    <form onSubmit={ handleSubmit( onSubmit ) } className='flex flex-col space-y-4 w-[310px] sm:w-[450px] md:w-[500px] h-full '>
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
                            rows={ 15 }
                            maxLength={ 1000 }
                            { ...register('description', {
                                required: 'Este campo es requerido',
                                maxLength: { value: 1000, message: 'Máximo 1000 caracteres' },
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                        >

                        </textarea>
                        <button 
                            className='absolute bottom-4 right-24 rounded-full 
                            w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-green-500'
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


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { tasksApi } from '../../../../api'
import { db, dbEntries } from '../../../../database'

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