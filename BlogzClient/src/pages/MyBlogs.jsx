import BlogsCard from "../components/BlogsCard"
import Blogs from "../components/Blogs"
import { ToastContainer } from 'react-toastify';
import { useEffect,useState } from "react";
import getRequest from "../Utils/api/getRequest"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import human from '../assets/human.gif'
import SearchContent from "../components/SearchContent";


const MyBlogs = () => {
    const [blogs,setBlogs] = useState(null)
    const state = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        const getBlogs = async () => {
            try {
              const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/blogs/${state.currentUser._id}`,
                {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization : `Bearer ${state.currentUser.token}`
                    },
                }
            )
            const res = await response.json()
              setBlogs(res);
            } catch (error) {
              console.log("Error getting blogs", error);
            }
          };
        getBlogs()

    },[])
    return(
        <div className="-z-10 absolute w-11/12 sm:w-full right-0 top-28 bg-gray-900 bg-opacity-25 h-screen">
            {
                state.currentUser ? blogs ?
                <BlogsCard blogs={blogs} title={"Your"} source={"my_blogs"}/> :
                <div className="absolute right-0 top-18 bg-gray-900 bg-opacity-25 z-10 h-screen w-11/12 flex items-center justify-center">
                        <div className="flex items-center">
                            <span className="text-3xl mr-4">Loading</span>
                            <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>
                    </div> : 
                <div className="mt-20 text-center">
                    <h1 className="mb-4 text-6xl font-semibold text-red-500 flex flex-row justify-center">
                        <img className='bg-black rounded-full' src={human} alt='not found' />
                    </h1>
                    <p className="mb-4 text-lg text-gray-600">Oops! Looks like you're not logged in.</p>
                    <div className="animate-bounce">
                        <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </div>
                    <p className="mt-4 text-gray-600">Let's  <a onClick={() => navigate('/signin')} className="cursor-pointer hover:underline text-blue-500">login</a> to see your blogs.</p>
                </div>
                
            }
            <ToastContainer />
        </div>
    )
}

export default MyBlogs