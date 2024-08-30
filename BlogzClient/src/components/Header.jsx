import { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import DrawerWithNavigation from './MenuItems';

const Header = () => {

    const [open,setOpen] = useState(false)
   
    

    return(
        <>
        
        <div className='p-5 fixed w-full'>
            <nav className="z-30 bg-white backdrop-blur-sm border-gray-200 dark:text-gray-400 dark:bg-gray-900 dark:bg-opacity-40 rounded-2xl">
            <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4">
                {/* <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white pl-10">Blogz</span>
                </a> */}
                <div className=" md:order-2 hidden sm:block">
                    <button onClick={() => setOpen(!open)} data-collapse-toggle="navbar-search" type="button" className="inline-flex border items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-row justify-end w-full">
                        <Profile />
                </div>
            </div>
        </nav>
        </div>
        {open ? <DrawerWithNavigation open={true}/> : <></>}
        </>

    )
}

export default Header