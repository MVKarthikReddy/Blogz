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
              const res = await getRequest(`/api/blogs/get?userid=${state.currentUser.id}`)
              setBlogs(res);
            } catch (error) {
              console.log("Error getting blogs", error);
            }
          };
        getBlogs()

    },[])
    return(
        <div className="-z-10 absolute w-11/12 right-0 top-28 bg-gray-900 bg-opacity-25 h-screen">
            {
                state.currentUser ? 
                <> <SearchContent /> <BlogsCard blogs={blogs} title={"Your"}/></> : 
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