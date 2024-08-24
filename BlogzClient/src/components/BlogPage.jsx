import { useEffect,useState } from "react"
import BlogsCard from "./BlogsCard"
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
            <BlogsCard blogs={blogs}/>
        </div>
    )
}

export default BlogPage