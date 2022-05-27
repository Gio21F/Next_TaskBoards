import React from 'react'
import { signOut } from 'next-auth/react';
import { Layout } from '../../components/layouts';

const PageDashboard = () => {
  return (
    <Layout title='Dashboard'>
      <h1 className='text-3xl font-bold'> Tableros </h1>
      <div className='w-full flex flex-wrap gap-y-2 place-content-center h-auto mt-5 '>
        <button className='btn-board'>
          <p className='px-2 truncate font-semibold text-lg'> Tablero 1 </p>
        </button>
        <div className='btn-board'>
          <p className='px-2 truncate'> Tablero 1 </p>
        </div>
        <div className='btn-board'>
          <p className='px-2 truncate'> Tablero 1 </p>
        </div>
        
      </div>
    </Layout>
  )
}

export default PageDashboard
