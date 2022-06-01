import React, { useContext } from 'react'
import { BiPlus } from 'react-icons/bi'
import { BoardsContext } from '../../context/boards'
import { IBoard } from '../../interfaces'
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import { optionsToast } from '../../utils/notications';

interface Props {
  userId: string
}

export const ContainerBoards = () => {
  const router = useRouter()
  const { createBoard, boards } =  useContext( BoardsContext )

  const createBoardHandler = async ( title:string ) => {
    const { hasError, message } = await createBoard( title )
    if (hasError) {
      toast.error(message, optionsToast)
    } else {
      toast.success('La lista se creo correctamente', optionsToast)
    }
  }
  
  return (
    <>
        <h1 className='text-3xl font-bold'> Tableros </h1>
        <div className='w-full flex flex-wrap gap-y-2 place-content-center h-auto mt-10 '>
          <button onClick={ () => createBoardHandler( 'Nuevo Tablero' ) } className='absolute top-20 right-4 rounded-lg w-44 p-2 flex items-center justify-center border-2 border-indigo-500 text-gray-400 hover:text-white '>
            <BiPlus className='w-8 h-8' /> Crear Tablero
          </button>
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
