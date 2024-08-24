import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InitialContent = () => {

    const navigate = useNavigate()


    return(
        <>
            <div className="mt-4 bg-white dark:bg-gray-900 dark:bg-opacity-35 dark:text-gray-400 flex flex-col items-center justify-center text-center p-4">

                <p className="font-mono py-4">
                    Hello Buddy, Welcome to <span className="text-red-800 text-2xl font-bold">Blogz</span> <br></br>
                    Please Login to post a blog
                </p>
                <div className="flex flex-row justify-around w-3/6">
                    <button 
                        type="button" 
                        onClick={() => navigate('/signin')}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            Sign In
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/signup')}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            Sign Up
                    </button>
                </div>
            </div>
        </>
    )
}

export default InitialContent