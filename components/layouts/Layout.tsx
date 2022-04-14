import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar, Sidebar } from '../ui'

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export const Layout: FC<Props> = ({ title = 'OpenJira', children }) => {
  return (
    <div className='w-full h-screen bg-black text-white'>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />
      <div className='py-5 px-8'>
        { children }
      </div>
    </div>
  )
}
