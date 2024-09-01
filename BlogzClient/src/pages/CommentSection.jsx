import { useEffect, useState } from 'react';

import io from 'socket.io-client';
import axios from 'axios';
import getRequest from '../Utils/api/getRequest';
import postRequest from '../Utils/api/PostRequest';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCount,decrementCount } from '../redux/user/commentSlice'
import notify from '../Utils/notifier/Notifier';
import { ToastContainer } from 'react-toastify';


const socket = io(`${import.meta.env.VITE_BACKEND_API_URL}`);
const CommentSection = ({postId,userId,user}) => {

    const state = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {

        

        // Fetch existing comments for the post
        const fetchComments = async () => {

            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/comments/${postId}`,
                    {
                        method: "GET",
                        headers: {
                          "Content-Type": "application/json",
                        },
                    }
                )
                const response = await res.json()
                if(response.message == 0){
                    setComments([])
                }
                else{
                    setComments(response)
                }
                
                console.log(response)

            } catch (error) {
                console.log(error)
            }    
        }
        fetchComments()
        
        
        
        // Listen for new comments via Socket.io
        socket.on('new-comment', (newComment) => {
            if(comments.length>0){
                setComments((prevComments) => [newComment,...prevComments]);
            }
            else{
                setComments([newComment]);
            }
                
        });
    
        // Cleanup on component unmount
        return () => {
          socket.off('new-comment');
        };


      }, [postId]);



      const handleSubmit = async (e) => {
        e.preventDefault();

        if(!state.currentUser){
            notify('Please login to comment',403)
            setComment('')
            return
        }
    
        if (comment.trim()) {
          const newComment = {
            postId,
            comment,
          };
          try {
            const res = await postRequest(newComment, '/api/comments/post', state.currentUser.token);

            if(res.ok)
            {
                dispatch(incrementCount())
                notify('Comment Posted.',201)
            }else{
                notify('You already commented!',res.status)
            }
            setComment(''); // Clear the input field
          } catch (error) {
            console.error('Error posting comment:', error);
          }
        }
      };
    




    return(
        <section className="bg-white dark:bg-gray-900 dark:bg-opacity-0 py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4 py-7 bg-gray-900 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion</h2>
                </div>
                <form className="mb-6" onSubmit={(e) => {handleSubmit(e)}}>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="6"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Write your thoughts on this blog..." required></textarea>
                    </div>
                    <button type="submit"
                        className="inline-flex border items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Post comment
                    </button>
                </form>
                {(comments.length>0) ? comments.map((com,index) => (
                    <article key={index} className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <footer className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                    <img
                                        className="mr-2 w-6 h-6 rounded-full"
                                        src={com.profilePicture}
                                        alt={com.username} 
                                        />
                                        {com.username}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-03-12"
                                        title="March 12th, 2022">{new Date(com.createdAt).toLocaleString()}</time></p>
                            </div>
                            <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                </svg>
                                <span className="sr-only">Comment settings</span>
                            </button>
                            <div id="dropdownComment3"
                                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <p className="text-gray-500 dark:text-gray-400">{com.comment}</p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button type="button"
                                className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                </svg>
                                Reply
                            </button>
                        </div>
                </article>
                )) : <>No Comments yet, be the first one..</>}

            </div>
            <ToastContainer />
        
        </section>
    )
}

export default CommentSection