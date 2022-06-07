import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';
import { BiMenu, BiLogOut, BiMoon, BiSun } from 'react-icons/bi'
import { signOut } from 'next-auth/react';

export const Navbar = () => {
  const { openSideMenu, currentTheme, changeCurrentTheme } = useContext( UIContext );
  return (
    <div className='flex items-center justify-between h-16 p-6 shadow-md text-black dark:text-white shadow-indigo-500/75'>
      <div className='flex space-x-2 items-center'>
        <button 
          onClick={ openSideMenu }
          className='flex items-center justify-center'>
          <BiMenu className='w-10 h-10' />
        </button>
        <NextLink href='/dashboard' passHref>
          <p className='font-bold text-lg cursor-pointer'>TasksBoards</p>
        </NextLink>
      </div>

      <div className='flex w-full place-content-end'>
        { (currentTheme === 'light') 
          ? (
            <button 
              onClick={ () => changeCurrentTheme( 'dark' ) }
              className='flex p-2 items-center justify-center'>
              <BiMoon className='w-10 h-10' />
            </button>
          )
          : (
            <button 
              onClick={ () => changeCurrentTheme( 'light' ) }
              className='flex p-2 items-center justify-center'>
              <BiSun className='w-10 h-10' />
            </button>
          )
        }
        <button 
          onClick={ () => signOut() }
          className='flex items-center justify-end'>
          <BiLogOut className='w-10 h-10' />
        </button>
      </div>
    </div>
  )
}