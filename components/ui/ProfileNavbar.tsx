import { Fragment, useRef, useState, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BiUser } from 'react-icons/bi'
import { AuthContext } from '../../context/auth'
import Image from 'next/image'

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

export const ProfileNavbar = ({open, setOpen}:Props) => {
    const { user } = useContext( AuthContext )
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="h-[90vh] min-w-[320px] max-w-[600px] absolute top-16 sm:top-8 right-0 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"> */}
                                        {/* <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                                    {/* </div> */}
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Account
                                        </Dialog.Title>
                                        {/* <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                            Are you sure you want to deactivate your account? All of your data will be permanently
                                            removed. This action cannot be undone.
                                            </p>
                                        </div> */}
                                    </div>

                                    <div className='flex items-center flex-col'>
                                        <button
                                            className='flex justify-center items-center w-20 bg-transparent h-20 
                                                        rounded-full ring-[3px] ring-indigo-600'
                                        >
                                            {
                                                ( user?.image ) 
                                                    ?
                                                        <Image 
                                                            src={user.image}
                                                            alt="User"
                                                            width={100}
                                                            height={100}
                                                            className="rounded-full "
                                                        />
                                                    : <BiUser className='w-10 h-10' />

                                            }
                                        </button>
                                        <h1 className='text-lg font-semibold mt-2'>{ user?.name }</h1>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>  
            </Dialog>
        </Transition.Root>
    )
}
