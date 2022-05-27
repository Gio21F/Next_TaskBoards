import Head from 'next/head';
import React from 'react'

interface Props {
    children: JSX.Element | JSX.Element[];
    title: string;
  }

export const AuthLayout = ({ children, title }:Props ) => {
  return (
    <div className='w-full h-screen bg-slate-900 flex place-content-center'>
        <Head>
            <title>{title}</title>
        </Head>
        <main className='flex place-content-center'>
            {children}
        </main>
    </div>
  )
}
