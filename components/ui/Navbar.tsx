import NextLink from 'next/link';
import Image from 'next/image';

import { UIContext } from '../../context/ui';
import { AuthContext } from '../../context/auth';

import { signOut } from 'next-auth/react';

import { BiLogOut, BiMoon, BiSun, BiUser } from 'react-icons/bi'
import { ProfileNavbar } from './ProfileNavbar';
import { useContext, useState } from 'react';

export const Navbar = () => {
  const { currentTheme, changeCurrentTheme,  } = useContext( UIContext );
  const { user } = useContext( AuthContext )
  const [open, setOpen] = useState(false);

  return (
    <div className='flex bg-black-2/10 items-center bg-transparent justify-between h-16 p-6 shadow-md text-black dark:text-white shadow-indigo-500'>
      <div className='flex space-x-2 items-center'>
        <NextLink href='/dashboard' passHref>
          <p className='font-bold text-lg cursor-pointer'>TasksBoards</p>
        </NextLink>
      </div>

      <div className='flex w-full place-content-end space-x-4'>
        { (currentTheme === 'light') 
          ? (
            <button 
              onClick={ () => changeCurrentTheme( 'dark' ) }
              className='flex p-2 items-center justify-center'>
              <BiMoon className='w-7 h-7' />
            </button>
          )
          : (
            <button 
              onClick={ () => changeCurrentTheme( 'light' ) }
              className='flex items-center justify-center'>
              <BiSun className='w-7 h-7' />
            </button>
          )
        }
        <button 
          onClick={ () => signOut() }
          className='flex items-center justify-center'>
          <BiLogOut className='w-7 h-7' />
        </button>

        <button
          className='flex justify-center items-center w-10 bg-transparent h-10 rounded-full ring-2 ring-indigo-600'
          onClick={ () => setOpen(!open) }
        >
          {
            user?.image ?
              <Image src={ user.image } className="rounded-full overflow-hidden" alt={ user.name } width={ 40 } height={ 40 } />
              : <BiUser className='w-7 h-10' />
          }
          
        </button>

        <ProfileNavbar open={open} setOpen={setOpen}  />
        
      </div>
    </div>
  )
}