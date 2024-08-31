import { useEffect,useState } from "react"
import BlogsCard from "./BlogsCard"


const BlogPage = () => {

    return(
        <div>
            <BlogsCard blogs={blogs} title={"All"}/>
        </div>
    )
}

export default BlogPage