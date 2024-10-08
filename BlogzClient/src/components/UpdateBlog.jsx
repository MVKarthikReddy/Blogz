
import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";

import getRequest from '../Utils/api/getRequest';
import { imageDb } from "../Utils/FireBaseImageStore"
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';// import {v4} from 'uuid'
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

// For toasting messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import putRequest from "../Utils/api/putRequest";
import 'react-toastify/dist/ReactToastify.css';
import EditorComponent from './EditorComponent';


const UpdateBlog = () => {
    const [loading,setLoading] = useState(false)
    const state = useSelector((state) => state.user)


    const [blog,setBlog] = useState({
        author:state.currentUser.username,
        category: '',
        title: '',
        intro: '',
        readTime: '',
        description:"",
        imageUrls:''
    })
    const params = useParams()

    useEffect(() => {
        const fetchBlog = async () => {
          try {
            setLoading(true);
            const blog = await getRequest(`/api/blogs/get/${params.id}`) 
            setBlog(blog)
                       
          } catch (error) {
            setLoading(false);

          }
        };
        fetchBlog();
      }, []);

   

    const [image,setImage] = useState(null)
    const [submitted,setSubmitted] = useState(true)
    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        author:state.currentUser.username,
        category: blog.category || '',
        title: blog.title || '',
        intro: blog.intro || '',
        readTime: blog.readTime || '',
        description: blog.description || "",
        imageUrls: blog.imageUrls || ''
    })

    const [uploading,setUploading] = useState(false)
    const [imageUploadError,setImageUploadError] = useState()

    const handleImageUpload = (e) => {

        if (image){
          setUploading(true);
          setImageUploadError(false);
    
          const promises = [];
    
          promises.push(storeImage(image));
          
          Promise.all(promises)
            .then((urls) => {
                setBlog({
                ...blog,
                imageUrls: urls,
                
              });
              setImageUploadError(false);
              setUploading(false);
              setSubmitted(true)
            }) 
            .catch((err) => {
              setImageUploadError('Image upload failed (2 mb max per image)');
              setUploading(false);
            });
        } else {
          setUploading(false);
        }
      };
    
      const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          // const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageref = ref(imageDb, fileName);
          const uploadTask = uploadBytesResumable(storageref, file);
          
    
          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded.
              // Observe when the download is "complete"
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };
      

    const handleSubmit = async (e) => {
        setUploading(true)
        e.preventDefault()
        
        const res = await putRequest(blog,`/api/blogs/update/${params.id}`,state.currentUser.token)
       
        if(res.ok){
            // notify('successfully posted blog',res.status)
            navigate('/my-blogs')
        }


        
    }

    return(
        <>
            <div className='-z-10 absolute w-11/12 bg-gray-900 bg-opacity-25 right-0 top-28'>
            
            {(blog) ? <form  className="mb-9" onSubmit={(e) => {handleSubmit(e)}}>
                
                <div className="w-full flex flex-row justify-center">
                    <p className="text-3xl p-4 font-mono">
                        Update Your Blog
                    </p>
                </div>
                <div className="grid grid-cols-6 gap-6 ">
                        <div className="col-span-6">
                            <div className="flex flex-row justify-center">
                                <label className="flex flex-col relative items-center w-4/6 justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 bg-opacity-55 hover:bg-gray-10">
                                        {blog.imageUrls ? (
                                            <span>
                                            <img
                                                src={blog.imageUrls}
                                                className="w-full h-full bg-blue-300"
                                            />
                                            
                                            </span>
                                        ) : (
                                            <div 
                                                className="flex flex-col items-center justify-center py-24"
                                                onClick={() => {
                                                    setSubmitted(false)
                                                    }
                                                }
                                            >
                                                <svg
                                                    className="w-8 h-8 mb-4 text-black"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-black">
                                                    <span className="font-semibold">
                                                    Click to upload
                                                    </span>{" "}
                                                    or drag and drop
                                                </p>
                                                <p className="text-xs text-black">
                                                    SVG, PNG, JPG or JPEG (Regarding Blog)
                                                </p>
                                            </div>
                                        )}

                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                </label>
                            </div>
                            {!submitted ? <div className="flex flex-row justify-around">
                                    
                                    <button
                                        className="mt-7 border font-semibold px-6 py-1 rounded bg-slate-500 hover:bg-slate-600"
                                                onClick={(e) => {
                                                e.preventDefault();
                                                setImage(null);
                                                }}
                                            >Cancel</button>
                                    <button 
                                        className="mt-7 border font-semibold px-6 py-1 rounded bg-slate-500 hover:bg-slate-600" 
                                        onClick={(e) => {
                                            if(!image){
                                                alert('First, upload an image')
                                            }else{
                                                handleImageUpload(e)
                                            }
                                            
                                            }}>
                                        Submit Image
                                    </button>
                                </div>:<></>}
                        </div>

                    <div className="col-span-6 flex flex-col justify-center items-center">
                            <div className="flex w-4/6 flex-row justify-between">
                            
                                <div className="w-2/6">
                                    <label className="text-sm font-medium block my-2">
                                        Category
                                    </label>
                                    <select
                                        className="cursor-pointer shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        value={blog.category}
                                        onChange={(e) =>
                                        setBlog({ ...blog, category: e.target.value })
                                        }
                                        required
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        <option value="technology">Technology</option>
                                        <option value="lifestyle">Lifestyle</option>
                                        <option value="food">Food & Cooking</option>
                                        <option value="education">Food & Cooking</option>
                                        <option value="finance">Finance & Business</option>
                                        <option value="travelling">Travelling & Adventure</option>
                                        <option value="environment">Environment & Sustainability</option>
                                        <option value="sports">Sports</option>
                                        
                                    </select>
                                </div>

                                <div className="w-2/4">
                                    <label
                                        htmlFor="price"
                                        className="text-sm font-medium block my-2"
                                    >
                                        Read Time
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="in minutes"
                                        value={blog.readTime}
                                        onChange={(e) =>
                                            setBlog({ ...blog, title: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                            </div>
                            <div className="w-4/6">
                                    <label
                                        htmlFor="price"
                                        className="text-sm font-medium block my-2"
                                    >
                                        Blog Title
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Blog Title"
                                        value={blog.title}
                                        onChange={(e) =>
                                            setBlog({ ...blog, title: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                           
                            <div className="w-4/6">
                                    <label
                                        htmlFor="price"
                                        className="text-sm font-medium block my-2"
                                    >
                                        Introduction
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Intro to your blog"
                                        value={blog.intro}
                                        onChange={(e) =>
                                            setBlog({ ...blog, intro: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="w-4/6">
                                    <label
                                        htmlFor="price"
                                        className="text-sm font-medium block my-2"
                                    >
                                        Blog Content
                                    </label>
                                    {blog.description ? <EditorComponent data={blog.description} formData={blog} setFormData={setBlog} onChange={(e) => {console.log('hai')}} editorblock="editorjs-container" /> : <></>}
                                    

                                </div>
                                <button type="submit" className="mt-7 border font-semibold px-6 py-1 rounded bg-slate-500 hover:bg-slate-600">
                                    Update Blog
                                </button>
                    </div>
                </div>
            </form> : <></>}
            </div>
            <ToastContainer />
        </>
    )
}

export default UpdateBlog