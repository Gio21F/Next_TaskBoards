import Head from 'next/head'
import Image from 'next/image';
import React, { FC } from 'react'
import { Navbar, Sidebar } from '../ui'

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export const Layout: FC<Props> = ({ title = 'Tasks Boards', children }) => {
  // bg-[url('/imageBoardsBackground/coffee.jpg')] bg-cover bg-no-repeat bg-center
  return (
    <div className="w-full h-screen dark:bg-slate-900 bg-slate-200">
      {/* <Image 
        src="/imageBoardsBackground/astronauta1.jpg"
        alt="Astronauta"
        className="bg-cover bg-center bg-no-repeat "
        layout='fill'
      /> */}
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      {/* <Sidebar /> */}
      <div className='py-5 px-2 sm:px-8 '>
        { children }
      </div>
      
    </div>
  )
}
