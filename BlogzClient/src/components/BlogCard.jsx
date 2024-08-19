
import { useNavigate } from "react-router-dom"
const BlogCard = () => {
    const navigate = useNavigate()
    return(
        <section className="py-20">
            <h1 className="mb-12 text-center font-sans text-5xl font-bold">Recent Blogs</h1>
            <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
                
                <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
                    <a className="block h-full w-full">
                        <img className="max-h-40 w-full object-cover" alt="featured image" src="https://images.unsplash.com/photo-1660241588741-d653d53348fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
                        <div className="w-full bg-white p-4">
                        <p className="text-md font-medium text-indigo-500">Nature</p>
                        <p className="mb-2 text-xl font-medium text-gray-800">A Visit to Mount Abignale</p>
                        <p className="text-md font-light text-gray-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse vel neque ipsam?</p>
                        <div className="justify-starts mt-4 flex flex-wrap items-center">
                            <div 
                                className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600 hover:bg-blue-200"
                                onClick={() => navigate('/blogs')}
                                >Read more..</div>
                            {/* <div className="mr-2 mt-1 rounded-2xl bg-blue-100 py-1.5 px-4 text-xs text-gray-600">#icefactory</div> */}
                        </div>
                        </div>
                    </a>
                </article>
    
            </div>
        </section>

    )
}

export default BlogCard