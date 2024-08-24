import { useEffect,useState } from "react"
import BlogCard from "./BlogCard"
import getRequest from "../Utils/api/getRequest"


const BlogPage = () => {

    const [blogs,setBlogs] = useState(null)

    useEffect(() => {
        async function getBlogs() {
            const blogs = await getRequest('/api/blogs/get')

            console.log(blogs)
            setBlogs(blogs)
         

        }
        getBlogs()

    },[])

    return(
        <div className="">
            <BlogCard blogs={blogs}/>
        </div>
    )
}

export default BlogPage