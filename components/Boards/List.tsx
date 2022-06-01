import React from 'react'
import { IList } from '../../interfaces'

interface Props {
  list: IList
}

export const List = ({ list }:Props) => {
  return (
    <div className='w-54 bg-red-500 h-full p-5'>
      <h1 className='text-3xl font-bold'> { list.title } </h1>
    </div>
  )
}
