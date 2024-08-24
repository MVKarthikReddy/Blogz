import { useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'

const Header = () => {

    const navigate = useNavigate()
    const [option,setOption] = useState('home')

    return(
        <div className='p-5 fixed w-full'>
        <nav className="z-30 bg-white backdrop-blur-sm border-gray-200 dark:text-gray-400 dark:bg-gray-900 dark:bg-opacity-40 rounded-2xl">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white pl-10">Blogz</span>
                </a> */}
                <div className="flex md:order-2">
                    <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                    </button>
                    <div className="relative hidden md:block">
                        <Profile />
                    </div>
                    <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                    <div className="relative mt-3 md:hidden">
                        <Profile />
                    </div>
                    {/* <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li onClick={() => {
                            setOption('home')
                            navigate('/') 
                        }} className='cursor-pointer'>
                            <a className={`block py-2 px-3 text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white rounded md:bg-transparent ${option=='home' ? 'md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'md:text-white md:p-0 md:dark:text-white' }`} aria-current="page">Home</a>
                        </li>
                        <li onClick={() => {
                            setOption('about')
                            navigate('/') 
                        }} className='cursor-pointer'>
                        <a className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${option=='about' ? 'md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'md:text-white md:p-0 md:dark:text-white' }`}>About</a>
                        </li>
                        <li onClick={() => {
                            setOption('service')
                            navigate('/') 
                        }} className='cursor-pointer'>
                            <a className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${option=='service' ? 'md:text-blue-700 md:p-0 md:dark:text-blue-500' : 'md:text-white md:p-0 md:dark:text-white' }`}>Services</a>
                        </li>
                    </ul> */}
                </div>
            </div>
        </nav>
        </div>

    )
}

export default Header