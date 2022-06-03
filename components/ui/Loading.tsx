import React from 'react'
import { BiLoaderCircle } from 'react-icons/bi'

interface Props {
    status: string;
}

export const Loading = ({ status }:Props) => {
    if ( status !== 'loading' ) return <></>
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <BiLoaderCircle className='w-20 h-20 text-white/80' />
        </div>
    )
}
