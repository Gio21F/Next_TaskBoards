import React from 'react'
import { EntryList } from './EntryList'
import { NewEntry } from './NewEntry'

interface Props {
    status: 'pending' | 'in-progress' | 'finished'
    title: string
    newEntry?: boolean
}

export const Card = ({ status, title, newEntry }:Props) => {
  return (
    <div 
      className='border-[2px] w-[320px] border-[#76CB1A] rounded-md' 
      style={{ 
        height:'calc(100vh - 100px )'
      }}
    >
        <div className='px-5 py-2'>
            <p className='font-semibold text-lg'>{ title }</p>
        </div>
        {
            newEntry && <NewEntry />
        }
        <EntryList status={status} />
    </div>
  )
}
