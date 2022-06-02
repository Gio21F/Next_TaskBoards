import React, { useContext } from 'react'
import { BiPlus } from 'react-icons/bi'
import { BoardsContext } from '../../context/boards'
import { IBoard } from '../../interfaces'
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import { optionsToast } from '../../utils/notications';
import { useForm } from 'react-hook-form';

interface Props {
  userId: string
}

type FormData = {
  title: string
}

export const ContainerBoards = () => {
  const router = useRouter()
  const { createBoard, boards } =  useContext( BoardsContext )
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const createBoardHandler = async ( { title }:FormData ) => {
    const { hasError, message } = await createBoard( title )
    if (hasError) {
      toast.error(message, optionsToast)
    } else {
      toast.success('El tablero se creo correctamente', optionsToast)
    }
    reset()
  }
  
  return (
    <>
      <div className='w-full mb-5 flex sm:justify-between justify-center'>
        <h1 className='text-3xl font-bold hidden sm:inline mb-5'> Tableros </h1>
        {/* Crear Tablero */}
        <div className='w-56 flex flex-col'>
            <form className='flex' onSubmit={ handleSubmit( createBoardHandler ) } noValidate>
              <input 
                type="text" 
                className='w-full bg-transparent rounded-xl p-2 border-2 
                font-semibold border-indigo-500/40 caret-indigo-500/50'  
                placeholder='Nuevo Tablero'
                { ...register('title', {
                  required: 'Este campo es requerido',
                  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                  maxLength: { value: 30, message: 'Máximo 30 caracteres' }
              })}
              />
              <button className='ml-2 w-10 flex items-center place-content-center text-white rounded-lg border-2 border-indigo-500/40'><BiPlus className='h-6 w-6' /></button>
            </form>
            { errors.title && <p className='text-red-500 mt-1'>{ errors.title.message }</p> }
          </div>
          {/* Finaliza crear tableros */}
      </div>
      <div className='w-full flex flex-wrap gap-y-2 place-content-center h-auto mt-10 '>
        {
          ( boards.length <= 0 ) 
            ? <p className='text-gray-500 text-lg'> No hay tableros aun </p>
            : boards.map( (board:IBoard) => {
                return (
                  <button key={ board._id } onClick={ () => router.push(`/dashboard/board/${ board._id }`) } className='btn-board'>
                      <p className='px-2 truncate font-semibold text-lg'> { board.title } </p>
                  </button>
                )
              })
        }
      </div>
            
    </>
  )
}
