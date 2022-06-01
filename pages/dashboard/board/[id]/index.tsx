import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { BiPlus } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { List } from '../../../../components/Boards'
import { Layout } from '../../../../components/layouts'
import { BoardsContext } from '../../../../context/boards'
import { IList } from '../../../../interfaces'
import { optionsToast } from '../../../../utils'

const BoardPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { boards, lists, createList } = useContext( BoardsContext )
    const board = boards.find( board => board._id === id )
    const listas = lists.filter( list => list.board === id )

    const handleCreateList = async( title:string, id:string ) => {
        const { hasError, message } = await createList( title, id )
        if (hasError) {
            toast.error(message, optionsToast)
        } else {
            toast.success('El tablero se creo correctamente', optionsToast)
        }
    }
    return (
        <Layout title={ board?.title } >
            <h1 className='text-3xl font-bold flex'> { board?.title } </h1>
            <button onClick={() => handleCreateList( 'En Proceso', id as string )} className='absolute top-20 right-4 rounded-lg w-40 p-2 flex items-center justify-center border-2 border-indigo-500 text-gray-400 hover:text-white '>
                <BiPlus className='w-8 h-8' /> Crear Lista
            </button>
            <div 
                style={{ height: 'calc(100vh - 180px)' }} 
                className="mt-10 w-full overflow-hidden flex overflow-x-scroll scrollbar-hide">
                {
                    (listas.length > 0) 
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