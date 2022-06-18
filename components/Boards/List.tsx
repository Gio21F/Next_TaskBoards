import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { IList } from '../../interfaces'
import { EntryList } from './EntryList'
import { NewEntry } from './NewEntry'

interface Props {
  list: IList
}

export const List = ({ list }:Props) => {
  return (
    <div className='h-full min-w-[280px] p-5 border-2 border-indigo-500/70 rounded-lg text-black dark:text-white'>
      <div className='flex justify-between'>
        <h1 className='text-xl font-semibold mb-1'> { list.title } </h1>
        <button className='bg-transparent'>
          <BiDotsVerticalRounded className='h-8 w-8' />
        </button>
      </div>
      <EntryList status={ list._id! }/>
      <NewEntry status={ list._id! } />
    </div>
  )
}
