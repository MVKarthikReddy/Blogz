

import {useEffect, useState, useRef} from 'react'
import { useParams } from "react-router-dom";
import getRequest from '../Utils/api/getRequest';
import EditorJsHtml from 'editorjs-html';
import BlogViewer from './BlogReader';
import CommentSection from '../pages/CommentSection';
import io from 'socket.io-client';
import postRequest from '../Utils/api/PostRequest';
import { useDispatch, useSelector } from 'react-redux';
import notify from '../Utils/notifier/Notifier';
import { ToastContainer } from 'react-toastify';
import deleteRequest from '../Utils/api/deleteRequest';
import { setCount } from '../redux/user/commentSlice';


const socket = io(`${import.meta.env.VITE_BACKEND_API_URL}`);



const Blogs = () => {
    // Creating  a ref for the comment section
    const commentSectionRef = useRef(null);
    const params = useParams()

    const state = useSelector((state) => state.user)
    const count = useSelector((state) => state.comments.count);

    const dispatch = useDispatch()


    const [loading,setLoading] = useState(false)
    const [comments,setComments] = useState(null)
    const [like,setLike] = useState(false)
    const [likesCount,setLikesCount] = useState(0)
    const [blog,setBlog] = useState(null)
    const [user,setUser] = useState(null)
    const [day,setDay] = useState('')
    const [month,setMonth] = useState('')
    const [year,setYear] = useState('')
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

    useEffect(() => {
        const fetchBlog = async () => {
          try {
            setLoading(true);

            const blog = await getRequest(`/api/blogs/get/${params.id}`) 
            setBlog(blog)
            setLikesCount(blog.likesCount)

            const user = await getRequest(`/api/user/${blog.userRef}`)
          

            setUser(user)
            setDay(new Date(blog.updatedAt.split('T')[0]).getDate())
            setMonth(months[new Date(blog.updatedAt).getMonth()])
            setYear(new Date(blog.updatedAt.split('T')[0]).getFullYear())
            
          } catch (error) {
            setLoading(false);
          }
        };
        fetchBlog();
        const fetchComments = async () => {
            try {
                const res = await getRequest(`/api/comments/${params.id}`)
                setComments(res)
                dispatch(setCount(res.length))
                
                
            } catch (error) {
                console.log(error)
            }    
        }
        fetchComments()

        const fetchLikes = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/likes/get/${params.id}`,
                    {
                        method: "GET",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${state.currentUser.token}`
                        },
                    }
                )
                if(res.ok){
                    setLike(true)
                }
                
            } catch (error) {
                console.log(error)
            }    
        }
        if(state.currentUser){
            fetchLikes()
        }
        

        socket.on('like', ({ postId, likesCount }) => {
            if (postId === params.id) {
              // to update the likesCount
              setLikesCount(likesCount);
              setLike(true)
            }
          });
      
        socket.on('unlike', ({ postId, likesCount }) => {
            if (postId === params.id) {
              // to update the likesCount
              setLikesCount(likesCount);
              setLike(false)
            }
          });
      
          return () => {
            socket.off('like');
            socket.off('unlike');
          };
        
      }, [params.id]);


      const handleScrollToComments = () => {
        commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      };

      const handleLikesCount = async () => {
        if(!state.currentUser){
            notify('Please login to like the blog',403)
            return
        }
        if(!like){
            const res = await postRequest({},`/api/likes/like/${params.id}`,state.currentUser.token)
            if(res.ok)
            {
                setLike(true)
                notify('Eyy, You liked a blog..',res.status)
            }
            else{
                notify('You already liked the blog.',res.status)
            }
            
        }
        else if(like){
            const res = await deleteRequest(`/api/likes/unlike/${params.id}`,state.currentUser.token)
            if(res.ok)
            {
                setLike(false)
                notify('Ooo, You unliked a blog..',res.status)
            }
            else{
                notify('You can not unlike again..',res.status)
            }

        }
      }
    

  return (
    <>
        <div className="-z-10 absolute w-11/12 right-0 top-28 sm:w-full">
        {
            (blog && user && comments) ? 
            <div className="w-full h-full bg-white dark:bg-gray-800 dark:bg-opacity-30">
            <div className="w-full mx-auto py-10 bg-white dark:bg-gray-800 dark:bg-opacity-45">
                <div className="w-[94%] mx-auto flex gap-1 items-center text-gray-500 sm:text-[12px] xs:text-[10px] font-semibold dark:text-gray-400">
                    <div>Blog</div>
                    <div className="font-semibold text-md">-</div>
                    <div>{blog.category}</div>
                    <div className="font-semibold text-md">-</div>
                    <div>{blog.title}</div>
                </div>

                <h1 className="w-[92%] mx-auto lg:text-4xl md:text-3xl xs:text-2xl text-center font-serif font-semibold pb-4 pt-8 dark:text-white">
                    {blog.title}</h1>

                <img src={blog.imageUrls} alt="Blog Cover" className="xl:w-[70%] xs:w-[96%] mx-auto lg:h-[460px] md:h-[480px] rounded-lg" />

                <div className="w-[90%] mb-5 mx-auto flex md:gap-4 xs:gap-2 justify-center items-center pt-4">
                    <div className="flex gap-2 items-center">
                        <img src={user.profilePicture} className="xl:w-[2.2rem] xl:h-[2.2rem] lg:w-[2.2rem] lg:h-[2.2rem] md:w-[2.2rem] md:h-[2.2rem] xs:w-[2rem] xs:h-[2rem] sm:w-[2rem] sm:h-[2rem] rounded-full" />
                        <h2 className="text-sm font-semibold dark:text-white">{blog.author}</h2>
                    </div>
                    <div className="dark:text-gray-500 px-2">|</div>

                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">{month} {day}, {year}</h3>

                    <div className="dark:text-gray-500 px-2">|</div>
                    <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">{blog.readTime} MIN READ</h4>
                </div>
                <div className='text-gray-300 py-2 flex row justify-center text-center items-center'>
                    <label className='mx-5 flex flex-row items-center text-center'>
                        <img onClick={handleScrollToComments} 
                            className='w-10 cursor-pointer' 
                            src='https://img.icons8.com/fluency/48/messaging-.png'
                            alt="messaging-"

                            />
                            <span className='px-1'>
                                {count}
                            </span>
                    </label>
                    <label className='mx-5 flex flex-row items-center text-center'>
                        <img 
                            onClick={handleLikesCount}
                            className='w-10 cursor-pointer' 
                            src={`${!like ? 'https://img.icons8.com/ios/50/hearts--v1.png' : 'https://img.icons8.com/3d-fluency/94/red-heart.png'}`}
                            alt="red-heart"

                            />
                            <span className='px-1'>
                                {likesCount}
                            </span>
                    </label>
                </div>

                <div className="py-6 bg-white dark:bg-gray-800 dark:bg-opacity-45">
                    <div className="md:w-[80%] xs:w-[90%] mx-auto pt-4">
                        <p className="mx-auto text-xl xl:w-4/5 lg:w-5/6 sm:w-5/6 sm:text-base dark:text-gray-300">
                            {blog.intro}
                        </p>

                        <BlogViewer data={blog.description}/>
                        <div ref={commentSectionRef}>
                            <CommentSection  postId={blog._id} userId={blog.userRef} user={user}/>
                        </div>

                    </div>
                </div>

            </div>
        </div> : <> Loading..</>
        }
    </div>
    </>
  )
}

export default Blogs