import { Drawer, Box, Typography, List, 
    ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox','Starred','Send Email','Drafts']

export const Sidebar = () => {
    const { sidemenuOpen, closeSideMenu  } = useContext( UIContext );
    return (
        <>
            {
                sidemenuOpen 
                    ? (
                        <div 
                            className='w-52 h-screen space-y-4 p-5 
                                    bg-black absolute z-10 top-0 left-0'
                        >
                            <p onClick={ closeSideMenu } className='font-bold'>Menu</p>

                            {
                                menuItems.map( (text, index) => (
                                    <button 
                                        className='w-full text-left h-7 flex 
                                            items-center space-x-2' key={index}
                                    >
                                        <p>{text}</p>
                                    </button>
                                ))
                            }
                        </div>
                    )
                    : null
            }
        </>
    )
}
