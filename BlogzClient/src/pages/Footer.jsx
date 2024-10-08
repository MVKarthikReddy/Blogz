
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import github from '../assets/github.svg'
import { Link } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate()
    return(
       
        <div className="w-full sticky flex items-center justify-center bg-black bg-opacity-55">
            <div className="md:w-2/3 w-full px-4 text-white flex flex-col">
                <div className="flex flex-col">
                    <div className="flex mt-8 mb-8 flex-row justify-between items-center">
                        <div className="flex flex-row justify-center items-center">
                            <img className='w-12 rounded-lg' src={logo} alt='logo' />
                            <p className="px-2 text-3xl font-mono font-bold">Blogz</p>    
                        </div>
                        <a onClick={() => {
                            navigate('/about')
                        }} className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">About</a>
                        <a className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Services</a>
                        <Link to={`mailto:${'karthikmedagam@gmail.com'}`}> <a className="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Contact</a></Link>
                        <div className="flex flex-row space-x-8 items-center justify-between">
                            <a href='https://github.com/MVKarthikReddy/' className='w-4 h-4 cursor-pointer'>
                                <img src='https://img.icons8.com/?size=100&id=106567&format=png&color=ffffff' alt='github' />
                            </a>
                            
                            
                            <a href='https://karthikreddy.vercel.app/' className='w-4 h-4 cursor-pointer'>
                                <img src='https://img.icons8.com/?size=100&id=kktvCbkDLbNb&format=png&color=000000' alt='github' />
                            </a>
                            <a href="https://www.youtube.com/">
                                <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.7355 1.415C12.6616 1.14357 12.517 0.896024 12.3162 0.697014C12.1154 0.498004 11.8654 0.354468 11.5911 0.280692C10.5739 0.00450089 6.5045 4.87928e-06 6.5045 4.87928e-06C6.5045 4.87928e-06 2.43578 -0.00449139 1.41795 0.259496C1.14379 0.336667 0.894302 0.482233 0.693428 0.68222C0.492554 0.882207 0.347041 1.1299 0.270859 1.40152C0.00259923 2.40737 9.51671e-07 4.49358 9.51671e-07 4.49358C9.51671e-07 4.49358 -0.0025972 6.59006 0.263714 7.58564C0.413109 8.13609 0.851549 8.57094 1.40885 8.71931C2.43643 8.9955 6.49476 9 6.49476 9C6.49476 9 10.5641 9.00449 11.5813 8.74115C11.8557 8.6675 12.106 8.52429 12.3073 8.32569C12.5086 8.12709 12.6539 7.87996 12.729 7.60876C12.998 6.60355 12.9999 4.51798 12.9999 4.51798C12.9999 4.51798 13.0129 2.42086 12.7355 1.415ZM5.20282 6.42628L5.20607 2.57244L8.58823 4.50257L5.20282 6.42628Z" fill="white"/>
                                </svg>                            
                            </a>
                        </div>
                    </div>
                    <hr className="border-gray-600"/>
                    <p className="w-full text-center my-8 text-gray-600">Copyright © 2024 Karthik Medagam</p>
                </div>
            </div>
        </div>
    )
}

export default Footer