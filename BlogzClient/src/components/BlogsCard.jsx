import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';  
import io from 'socket.io-client';

import SearchContent from "./SearchContent";
import deleteRequest from "../Utils/api/deleteRequest";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import notify from "../Utils/notifier/Notifier";

const socket = io(`${import.meta.env.VITE_BACKEND_API_URL}`);


const BlogsCard = (props) => {

    const navigate = useNavigate()
    const state = useSelector((state) => state.user)
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

   
    const handleDelete = async (blog_id) => {

        const res = await deleteRequest(`/api/blogs/delete/${blog_id}`,state.currentUser.token)
        if(res.ok){
            window.location.reload()
            notify('successfully deleted',200)
        }
  
    }
    
    return(
        <div className=" pt-5">
            <p className="px-10 text-2xl font-bold">{props.blogs ? `${props.blogs.length>0 ? `${props.title} Blogs` : ''}` : ""}</p>
            <section className="flex flex-row flex-wrap mx-auto">
            {
                props.blogs? props.blogs.map((item, index) => (
                    
                    <div
                        key={index}
                        className={`transition-all hover:translate-y-2 duration-150 flex flex-col w-full px-4 py-6 md:w-1/2 lg:w-1/3 ${props.source=='my_blogs' ? 'mb-10':''}`}
                        
                    >
                        <div
                            className="cursor-pointer flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl"
                            onClick={() => {
                            navigate(`/blogs/${item._id}`)
                        }}
                        >
                            <div className="md:flex-shrink-0">
                                <img
                                    src={item.imageUrls}
                                    alt="Blog Cover"
                                    className="object-fill w-full rounded-lg rounded-b-none md:h-56"
                                />
                            </div>
                            <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
                                <span className="text-xs font-medium text-blue-600 uppercase">
                                    {item.category}
                                </span>
                                <div className="flex flex-row items-center">
                                {/* <div
                                    className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2"
                                >
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    ></path>
                                    </svg>
                                    <span>1.5k</span>
                                </div> */}

                                <div
                                    className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2"
                                    >
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    ></path>
                                    </svg>
                                    <span></span>
                                </div>

                                <div
                                    className="text-xs font-medium text-gray-500 flex flex-row items-center"
                                >
                                    <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                    ></path>
                                    </svg>
                                    <span></span>
                                </div>
                                </div>
                            </div>
                            <hr className="border-gray-300" />
                            <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
                                <a href="#" className="hover:underline">
                                    <h2 className="text-2xl font-bold tracking-normal text-gray-800">
                                        {item.title}
                                    </h2>
                                </a>
                            </div>
                            <hr className="border-gray-300" />
                            <p
                                className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700"
                            >
                            {item.intro}
                            </p>
                            <hr className="border-gray-300" />
                            <section className="px-4 py-2 mt-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center flex-1">
                                        <img
                                            className="object-cover h-10 rounded-full"
                                            src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"
                                            alt="Avatar"
                                        />
                                        <div className="flex flex-col mx-2">
                                        <a href="" className="font-semibold text-gray-700 hover:underline">
                                            {item.author}
                                        </a>
                                        <span className="mx-1 text-xs text-gray-600">{`${new Date(item.updatedAt.split('T')[0]).getDate()} ${months[new Date(item.updatedAt).getMonth()]} ${new Date(item.updatedAt.split('T')[0]).getFullYear()}`}  </span>
                                    </div>
                                </div>
                                <p className="mt-1 text-xs text-gray-600">{item.readTime} minutes read</p>
                                </div>
                                
                            </section>
                            
                        </div>
                        <div className="text-black flex flex-row justify-around">
                        {
                            props.source == "my_blogs" ? 
                            <div className="w-full flex flex-row justify-around mb-5">
                                <button onClick={() => {
                                                navigate(`/update/blogs/${item._id}`)
                                            }} 
                                            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-blue-800"
                                    >
                                    Update
                                </button>
                                <button onClick={
                                    () => {
                                        handleDelete(item._id)
                                    }
                                } className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-blue-800">
                                     Delete
                                </button>
                            </div>
                            :
                            <></>     
                        }
                    </div>
                    </div>  
                )) : <div >
                        
                    </div>
                
            }
            </section>
        </div>
    )
}

export default BlogsCard

BlogsCard.propTypes = {
    props : PropTypes.object
}