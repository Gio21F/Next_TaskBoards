import { useRouter } from 'next/router'
import React, { useContext, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { BiPlus } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { List } from '../../../../components/Boards'
import { Layout } from '../../../../components/layouts'
import { BoardsContext } from '../../../../context/boards'
import { IList } from '../../../../interfaces'
import { optionsToast } from '../../../../utils'

type FormData = {
    title: string
}

const BoardPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { boards, lists, createList } = useContext( BoardsContext )
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const board = boards.find( board => board._id === id )
    const listsByBoards = useMemo( () => lists.filter( list => list.board === id ), [ lists, id ] )

    const handleCreateList = async( { title }:FormData ) => {
        if ( id ){
            const { hasError, message } = await createList( title, id as string )
            if (hasError) {
                toast.error(message, optionsToast)
            } else {
                toast.success('La lista se creo correctamente', optionsToast)
            }
            return reset()
        }
        toast.error('No se encontró el id del tablero', optionsToast)
        reset()
    }
    return (
        <Layout title={ board?.title } >
            <div className='w-full mb-5 flex sm:justify-between justify-center'>
                <h1 className='text-3xl font-bold hidden sm:inline mb-5'> { board?.title } </h1>
                {/* Crear Lista */}
                <div className='w-56 flex flex-col'>
                    <form className='flex' onSubmit={ handleSubmit( handleCreateList ) } noValidate>
                    <input 
                        type="text" 
                        className='w-full bg-transparent rounded-xl p-2 border-2 
                        font-semibold border-indigo-500/40 caret-indigo-500/50'  
                        placeholder='Nuevo Lista de tareas'
                        { ...register('title', {
                            required: 'Este campo es requerido',
                            minLength: { value: 4, message: 'Mínimo 2 caracteres' },
                            maxLength: { value: 30, message: 'Máximo 30 caracteres' }
                        })}
                    />
                    <button className='ml-2 w-10 flex items-center place-content-center text-white rounded-lg border-2 border-indigo-500/40'><BiPlus className='h-6 w-6' /></button>
                    </form>
                    { errors.title && <p className='text-red-500 mt-1'>{ errors.title.message }</p> }
                </div>
                {/* Finaliza crear tableros */}
            </div>
            
            <div 
                style={{ height: 'calc(100vh - 200px)' }} 
                className="mt-2 w-full space-x-4 overflow-hidden flex overflow-x-scroll scrollbar-hide">
                {
                    (listsByBoards.length > 0) 
                        ? lists.map( (list:IList) => {
                            return (
                                <List list={list} key={ list._id } />
                            )
                          })
                        : <p className='text-gray-500 text-lg text-center'> No hay listas aun </p>
                }
            </div>
        </Layout>
    )
}
export default BoardPage