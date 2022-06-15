import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar, Sidebar } from '../ui'

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export const Layout: FC<Props> = ({ title = 'Tasks Boards', children }) => {
  return (
    <div className='w-full h-screen dark:bg-slate-900 bg-slate-200'>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      {/* <Sidebar /> */}
      <div className='py-5 px-8'>
        { children }
      </div>
    </div>
  )
}
