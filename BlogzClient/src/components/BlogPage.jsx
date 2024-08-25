import { useEffect,useState } from "react"
import BlogsCard from "./BlogsCard"
import getRequest from "../Utils/api/getRequest"


const BlogPage = () => {

    

    return(
        <div className="bg-gray-900 bg-opacity-25">
            <BlogsCard blogs={blogs} title={"All"}/>
        </div>
    )
}

export default BlogPage