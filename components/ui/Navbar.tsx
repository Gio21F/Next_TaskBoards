import { useContext } from 'react';
import { UIContext } from '../../context/ui';

export const Navbar = () => {
  const { openSideMenu } = useContext( UIContext );
  return (
    <div className='w-full flex items-center h-10 p-6 shadow-md shadow-[#76CB1A]'>
      <div className='flex space-x-2'>
        <button 
          onClick={ openSideMenu }
          className='w-10 rounded-full flex items-center justify-center bg-green-400'>
          O
        </button>
        <p className='font-bold text-lg'>OpenJira</p>
      </div>
    </div>
  )
}
