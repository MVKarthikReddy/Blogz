import BlogsCard from "../components/BlogsCard"
import Blogs from "../components/Blogs"
import { ToastContainer } from 'react-toastify';
import { useEffect,useState } from "react";
import getRequest from "../Utils/api/getRequest"


const AllBlogs = () => {
    const [blogs,setBlogs] = useState(null)

    useEffect(() => {
        console.log('hello')
        const getBlogs = async () => {
            try {
              const res = await getRequest('/api/blogs/get')
              setBlogs(res);
            } catch (error) {
              console.log("Error getting blogs", error);
            }
          };
        getBlogs()

    },[])
    return(
        <div className="-z-10 absolute w-11/12 right-0 top-28">
            <BlogsCard blogs={blogs} title={"All"}/>
            <ToastContainer />
        </div>
    )
}

export default AllBlogs