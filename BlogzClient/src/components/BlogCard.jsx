
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';  

const BlogCard = (props) => {
    const navigate = useNavigate()

    const [blogs,setBlogs] = useState(props.blogs)
    console.log('blogs :',blogs)
    return(
        <section className="py-15">
            <h1 className="mb-12 text-center font-sans text-5xl font-bold">All Blogs</h1>
            <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
            {
               props.blogs? props.blogs.map((item, index) => (

                        <article key={index} className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
                            <a className="block h-full w-full">
                                <img className="max-h-40 w-full object-cover" alt="featured image" src={item.imageUrls} />
                                <div className="w-full bg-white p-4">
                                <p className="text-md font-medium text-indigo-500">{item.category}</p>
                                <p className="mb-2 text-xl font-medium text-gray-800">{item.title}</p>
                                <p className="text-md font-light text-gray-400">{item.intro}</p>
                                <div className="justify-starts mt-4 flex flex-wrap items-center">
                                    <div 
                                        className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600 hover:bg-blue-200"
                                        onClick={() => navigate(`/blogs/${item._id}`)}
                                        >Read more..</div>
                                    {/* <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">#icefactory</div> */}
                                </div>
                                </div>
                            </a>
                        </article>
                            
                        )) : <></>
            }
               
    
            </div>
        </section>

    )
}

export default BlogCard

BlogCard.propTypes = {
    props : PropTypes.oblect
}