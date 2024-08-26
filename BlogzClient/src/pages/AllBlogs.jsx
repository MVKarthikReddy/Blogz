import BlogsCard from "../components/BlogsCard"
import Blogs from "../components/Blogs"
import { ToastContainer } from 'react-toastify';
import { useEffect,useState } from "react";
import getRequest from "../Utils/api/getRequest"
import SearchContent from "../components/SearchContent";


const AllBlogs = () => {
    return(
        <div className="-z-10 absolute w-11/12 right-0 top-28 ">
            <SearchContent />
            <ToastContainer />
        </div>
    )
}

export default AllBlogs