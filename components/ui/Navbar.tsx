import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';
import { BiMenu, BiLogOut } from 'react-icons/bi'
import { signOut } from 'next-auth/react';

export const Navbar = () => {
  const { openSideMenu } = useContext( UIContext );
  return (
    <div className='flex items-center justify-between h-16 p-6 shadow-md shadow-indigo-500'>
      <div className='flex space-x-2 items-center'>
        <button 
          onClick={ openSideMenu }
          className='flex items-center justify-center'>
          <BiMenu className='w-10 h-10 text-white' />
        </button>
        <NextLink href='/dashboard' passHref>
          <p className='font-bold text-lg cursor-pointer'>TasksBoards</p>
        </NextLink>
      </div>

      <button 
        onClick={ () => signOut() }
        className='w-full flex items-center place-content-end justify-end'>
        <BiLogOut className='w-10 h-10 text-white' />
      </button>
    </div>
  )
}