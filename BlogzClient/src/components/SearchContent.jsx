import { useState,useEffect } from "react"
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
import getRequest from "../Utils/api/getRequest";
import BlogsCard from "./BlogsCard";
import NotFound from "./NotFound";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchContent = () => {
    const navigate = useNavigate()
    const [type,setType] = useState('All')
    const [blogs,setBlogs] = useState([])
    const [searchText,setSearchText] = useState('')
    const [searchParams,setSearchParams] = useSearchParams()



    useEffect(() => {
        const getBlogs = async () => {
            setSearchParams('')
            try {
              const res = await getRequest('/api/blogs/get')
              setBlogs(res);
            } catch (error) {
              console.log("Error getting blogs", error);
            }
          };
        getBlogs()

    },[])

    const filterBlogs = () => {
        searchText ? setBlogs(blogs.filter(f => f.title.toLowerCase().includes(searchText.trim()) || f.author.toLowerCase().includes(searchText.trim()))) : window.location.reload()
    }

    const fetchCategoryBlogs = async (category) => {
        setSearchParams({category:category})
        try {
            const res = await getRequest(`/api/blogs/get?category=${category}`)
            setBlogs(res);
          } catch (error) {
            console.log("Error getting blogs", error);
          }

    }



    return(
       
        <div className='flex flex-col items-center justify-center bg-gray-900 bg-opacity-25'>

            <div className="flex rounded-full bg-[#0d1829] px-2 my-3 w-full max-w-[600px]">
                    <Menu>
                        <MenuHandler>
                            <button className="self-center flex p-1 cursor-pointer bg-[#0d1829]"> 
                                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                                        <g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M11.567 9.8895C12.2495 8.90124 12.114 7.5637 11.247 6.7325C10.3679 5.88806 9.02339 5.75928 7.99998 6.4215C7.57983 6.69308 7.25013 7.0837 7.05298 7.5435C6.85867 7.99881 6.80774 8.50252 6.90698 8.9875C7.00665 9.47472 7.25054 9.92071 7.60698 10.2675C7.97021 10.6186 8.42786 10.8563 8.92398 10.9515C9.42353 11.049 9.94062 11.0001 10.413 10.8105C10.8798 10.6237 11.2812 10.3033 11.567 9.8895Z" stroke="#ff5c5c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.433 17.8895C11.7504 16.9012 11.886 15.5637 12.753 14.7325C13.6321 13.8881 14.9766 13.7593 16 14.4215C16.4202 14.6931 16.7498 15.0837 16.947 15.5435C17.1413 15.9988 17.1922 16.5025 17.093 16.9875C16.9933 17.4747 16.7494 17.9207 16.393 18.2675C16.0298 18.6186 15.5721 18.8563 15.076 18.9515C14.5773 19.0481 14.0614 18.9988 13.59 18.8095C13.1222 18.6234 12.7197 18.3034 12.433 17.8895V17.8895Z" stroke="#ff5c5c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M12 7.75049C11.5858 7.75049 11.25 8.08627 11.25 8.50049C11.25 8.9147 11.5858 9.25049 12 9.25049V7.75049ZM19 9.25049C19.4142 9.25049 19.75 8.9147 19.75 8.50049C19.75 8.08627 19.4142 7.75049 19 7.75049V9.25049ZM6.857 9.25049C7.27121 9.25049 7.607 8.9147 7.607 8.50049C7.607 8.08627 7.27121 7.75049 6.857 7.75049V9.25049ZM5 7.75049C4.58579 7.75049 4.25 8.08627 4.25 8.50049C4.25 8.9147 4.58579 9.25049 5 9.25049V7.75049ZM12 17.2505C12.4142 17.2505 12.75 16.9147 12.75 16.5005C12.75 16.0863 12.4142 15.7505 12 15.7505V17.2505ZM5 15.7505C4.58579 15.7505 4.25 16.0863 4.25 16.5005C4.25 16.9147 4.58579 17.2505 5 17.2505V15.7505ZM17.143 15.7505C16.7288 15.7505 16.393 16.0863 16.393 16.5005C16.393 16.9147 16.7288 17.2505 17.143 17.2505V15.7505ZM19 17.2505C19.4142 17.2505 19.75 16.9147 19.75 16.5005C19.75 16.0863 19.4142 15.7505 19 15.7505V17.2505ZM12 9.25049H19V7.75049H12V9.25049ZM6.857 7.75049H5V9.25049H6.857V7.75049ZM12 15.7505H5V17.2505H12V15.7505ZM17.143 17.2505H19V15.7505H17.143V17.2505Z" fill="#ff5c5c"/> </g>

                                </svg>
                            </button>
                        </MenuHandler>
                        <MenuList className="text-gray-300 bg-gray-900">
                            <MenuItem onClick={() => {
                                setType('Technology')
                                fetchCategoryBlogs('technology')
                            }} className="dark:hover:bg-gray-600">Tech Blogs</MenuItem>
                            <MenuItem onClick={() => {
                                setType('Lifestyle')
                                fetchCategoryBlogs('lifestyle')
                            }} className="dark:hover:bg-gray-600">Lifestyle Blogs</MenuItem>
                            <MenuItem onClick={() => {
                                setType('Environment')
                                fetchCategoryBlogs('environment')
                            }} className="dark:hover:bg-gray-600">Environment Blogs</MenuItem>
                            <MenuItem onClick={() => {
                                setType('Food & Cooking')
                                fetchCategoryBlogs('food')
                            }} className="dark:hover:bg-gray-600">Food & Cooking Blogs</MenuItem>
                            <MenuItem onClick={() => {
                                setType('Sports')
                                fetchCategoryBlogs('sports')
                            }} className="dark:hover:bg-gray-600">Sports Blogs</MenuItem>
                            <MenuItem onClick={() => {
                                setType('Travel')
                                fetchCategoryBlogs('travel')
                            }} className="dark:hover:bg-gray-600">Travel Blogs</MenuItem>
                            <MenuItem onClick={() => {
                                window.location.reload()
                                navigate('/blogs')
                            }} className="dark:hover:bg-gray-600">All Blogs</MenuItem>
                        </MenuList>
                    </Menu>
                    

                    <input
                            type="text"
                            className="w-full bg-[#0d1829] flex bg-transparent pl-2 text-[#cccccc] outline-0"
                            placeholder="Search blog title or author name"
                            value={searchText.author}
                            onChange={(e) => {
                                setSearchText(e.target.value)
                            }}
                            />
                    <button onClick={() => {
                        filterBlogs()
                    }} className="relative p-2 bg-[#0d1829] rounded-full">
                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                            <g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>

                        </svg>
                    </button>
            </div>
            <div>
                {blogs ? blogs.length>0 ? <BlogsCard blogs={blogs} title={type}/> : 
                <div className="absolute right-0 top-18 bg-gray-900 bg-opacity-25 z-10 h-screen w-11/12 flex items-center justify-center">
                        <div className="flex items-center">
                            <span className="text-3xl mr-4">Loading</span>
                            <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </div>
                    </div> : <NotFound />}
            </div>
        </div>

    )
}

export default SearchContent