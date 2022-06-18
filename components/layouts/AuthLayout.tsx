import Head from 'next/head';
import React from 'react'
import { BiMoon, BiSun } from 'react-icons/bi';

interface Props {
    children: JSX.Element | JSX.Element[];
    title: string;
    currentTheme: 'light' | 'dark';
    changeCurrentTheme: (newTheme: 'dark' | 'light') => Promise<{ hasError: boolean, message?: string }>;
  }

export const AuthLayout = ({ children, title, currentTheme, changeCurrentTheme }:Props ) => {
  return (
    <div className='w-full h-screen bg-slate-200 dark:bg-slate-900 flex place-content-center text-black dark:text-white/90'>
        <Head>
            <title>{title}</title>
        </Head>
        { (currentTheme === 'light') 
          ? (
            <button 
              onClick={ () => changeCurrentTheme( 'dark' ) }
              className='flex p-2 items-center justify-center absolute top-6 right-6'>
              <BiMoon className='w-7 h-7' />
            </button>
          )
          : (
            <button 
              onClick={ () => changeCurrentTheme( 'light' ) }
              className='flex p-2 items-center justify-center absolute top-4 right-4'>
              <BiSun className='w-7 h-7' />
            </button>
          )
        }
        <main className='flex place-content-center'>
            {children}
        </main>
    </div>
  )
}
