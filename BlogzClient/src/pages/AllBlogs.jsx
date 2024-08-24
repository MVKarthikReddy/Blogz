import BlogPage from "../components/BlogPage"
import Blogs from "../components/Blogs"
import { ToastContainer } from 'react-toastify';



const AllBlogs = () => {
    return(
        <div className="-z-10 absolute w-11/12 right-0 top-28">
            <BlogPage />
            <ToastContainer />
        </div>
    )
}

export default AllBlogs