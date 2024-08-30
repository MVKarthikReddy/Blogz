
import Main from '../components/Main'
import {useEffect, useState} from 'react'
import SearchContent from '../components/SearchContent'
import BlogPage from '../components/BlogPage'

import { useSelector } from 'react-redux'
import Footer from './Footer'
import BlogsCard from '../components/BlogsCard'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
export const Home = () => {
  const state = useSelector((state) => state.user); 
  const navigate = useNavigate()
  
  const [techBlogs,setTechBlogs] = useState([])
  const [travelBlogs,setTravelBlogs] = useState([])
  const [sportsBlogs,setSportsBlogs] = useState([])


  useEffect(() => {
    const fetchTechBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/blogs/get?category=technology&limit=4`);
        const data = await res.json();
        setTechBlogs(data);
        fetchSportsBlogs();
      } catch (error) {
        console.log("Error getting offer listings", error);
      }
    };

    const fetchSportsBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/blogs/get?category=sports&limit=4`);
        const data = await res.json();
        setSportsBlogs(data);
        fetchTravelListings();
      } catch (error) {
        console.log("Error getting offer listings", error);
      }
    };

    const fetchTravelListings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/blogs/get?category=travel&limit=4`);
        const data = await res.json();
        setTravelBlogs(data);
      } catch (error) {
        console.log("Error getting offer listings", error);
      }
    };

    fetchTechBlogs()

  },[])
  return (
    <>
        <div className='-z-10 absolute w-11/12 right-0 top-28 sm:static sm:w-full sm:pt-28 '>
            <Main />
            <BlogsCard blogs={techBlogs} title={"Tech"}/>
            <BlogsCard blogs={travelBlogs} title={"Travel"}/>
            <BlogsCard blogs={sportsBlogs} title={"Sports"}/>
            <div className='px-3 py-1 pb-5 w-full text-center'>
                <label
                  onClick={() => {
                    navigate('/blogs')
                  }}
                 className='px-3 py-1 rounded cursor-pointer hover:underline border'>All Blogs</label>
            </div>
            <Footer />
        </div>
        <ToastContainer />
    </>
  )
}
