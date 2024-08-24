
import 'react-slideshow-image/dist/styles.css'
import { Slide, Fade } from 'react-slideshow-image';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import notify from '../Utils/notifier/Notifier';
import blog_logo from '../assets/blog_av.png'

import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {

    const state = useSelector((state) => state.user)
    const navigate = useNavigate()

    const slideImages = [
        {
          url: 'https://wallpaperaccess.com/full/829018.jpg',
          caption: 'Technology'
        },
        {
          url: 'https://img.freepik.com/premium-photo/adventure-travel-hd-8k-wallpaper-stock-photographic-image_915071-72176.jpg?w=1060',
          caption: 'Travelling & Adventures'
        },
        {
          url: 'https://images7.alphacoders.com/872/872479.jpg',
          caption: 'Sports'
        },
      ];

      
      
      const divStyle = {        
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }

      const user_status = useState(localStorage.getItem('User_Status'))
      console.log(user_status)


    return(
        <>
            <div className={` items-center pt-10`}>
                <div className=" flex flex-row text-center">
                    <caption className="text-5xl w-4/6">Welcome to <span className="text-red-700 font-bold">Blogz</span></caption>
                </div>
                <div className="flex flex-row justify-center">
                    <p className="w-4/6 text-lg leading-7 pt-3">
                        <span className="pl-24"></span>Your go-to platform for insightful articles, fresh ideas, and a community of curious minds. Whether you're here to stay informed, get inspired, or share your thoughts, Blogz is designed to be a space where every voice matters.
                    </p>
                </div>
                <div className=" flex flex-row justify-center p-3 mt-3">
                    
                        <p className="text-lg leading-7 cursor-pointer hover:underline flex flex-row items-center" onClick={() => {
                            if(!state.currentUser){
                                notify('Please sign in to post a blog',409)
                                
                            }
                            else{
                                navigate('/create-blog')
                            }
                        }}>
                            <img className='w-6' src={blog_logo} alt='' />
                            <span className='px-2'>Let's begin your <label className='text-red-700'>Blogz</label> journey</span>
                        </p>
                    
                </div>
            
            </div>
            <div className='w-full flex flex-row justify-center mt-9 relative -z-10'>
                <div className='w-4/6'>
                    <Fade>
                        {slideImages.map((slideImage, index)=> (
                            <div key={index}>
                                <div className='flex flex-row justify-center lg:h-96 md:h-72 sm:h-56'  style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                                    <span className='text-black font-semibold font-mono border px-4 py-1 bg-white bg-opacity-55 rounded h-8 text-center mt-5'>
                                        {slideImage.caption}
                                    </span>
                                </div>
                            </div>
                        ))} 
                    </Fade>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Main