import { useState } from "react"
import { imageDb } from "../Utils/FireBaseImageStore"
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';// import {v4} from 'uuid'
// import { sum } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";


// For toasting messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import postRequest from "../Utils/api/PostRequest";
import notify from "../Utils/notifier/Notifier";
import EditorComponent from "./EditorComponent";

// Initial Data
const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Start your blog content here !",
        level: 2,
      },
    },
  ],
};

const CreateBlog = () => {

    const [image,setImage] = useState(null)
    const [submitted,setSubmitted] = useState(true)
    const [editorData,setEditorData] = useState(INITIAL_DATA)

    const state = useSelector((state) => state.user)
    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        author:state.currentUser.username,
        category:'',
        title: '',
        intro: '',
        readTime: '',
        description: INITIAL_DATA,
        imageUrls: ''
    })

    const [uploading,setUploading] = useState(false)
    const [imageUploadError,setImageUploadError] = useState()

    const handleImageUpload = (e) => {

        console.log('uploading image')
        console.log(image)
        if (image){
          setUploading(true);
          setImageUploadError(false);
    
          const promises = [];
    
          promises.push(storeImage(image));
          
          Promise.all(promises)
            .then((urls) => {
                console.log('image url : ',urls[0])
              setFormData({
                ...formData,
                imageUrls: urls[0],
                
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
          console.log("Select an image first")
          setUploading(false);
        }
      };
    
      const storeImage = async (file) => {
          console.log('uploading image')
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
        
        console.log(formData)
        const res = await postRequest(formData,'/api/blogs/create',state.currentUser.token)
       
        console.log(res)
        if(res.ok){
            // notify('successfully posted blog',res.status)
            navigate('/my-blogs')
        }


    }

    const handleChange = (e) => {
        console.log('Blog Content :',e.target.value)
        setFormData({ ...formData, description: e.target.value })
    }

    return(
        <>
            <div className='-z-10 absolute w-11/12 right-0 top-28'>
            
            <form  className="mb-9" onSubmit={(e) => {handleSubmit(e)}}>
                
                <div className="w-full flex flex-row justify-around items-center">
                    <p className="text-3xl p-4 font-mono">
                        Write Your Blog
                    </p>
                    <button type="submit" className=" border font-semibold px-6 py-1 rounded bg-slate-500 hover:bg-slate-600">
                        Post Blog
                    </button>
                </div>
                <div className="grid grid-cols-6 gap-6 ">
                        <div className="col-span-6">
                            <div className="flex flex-row justify-center">
                                <label className="flex flex-col relative items-center w-4/6 justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 bg-opacity-55 hover:bg-gray-10">
                                        {image ? (
                                            <span>
                                            <img
                                                src={formData.imageUrls}
                                                className="w-full h-full bg-blue-300"
                                            />
                                            
                                            </span>
                                        ) : (
                                            <div 
                                                className="flex flex-col items-center justify-center py-24"
                                                onClick={() => {
                                                    setSubmitted(false)
                                                    console.log(submitted)
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
                                        className="cursor-pointer shadow-sm bg-black bg-opacity-30 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-gray-500 block w-full p-2.5"
                                        value={formData.category}
                                        onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                        }
                                        required
                                    >
                                        <option className="py-1" value="" disabled>
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
                                        className="shadow-sm bg-gray-900 bg-opacity-30 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="in minutes"
                                        value={formData.readTime}
                                        onChange={(e) =>
                                        setFormData({ ...formData, readTime: e.target.value })
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
                                        className="shadow-sm bg-gray-900 bg-opacity-30 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Blog Title"
                                        value={formData.title}
                                        onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                           
                            <div className="w-4/6 bg-gray-900 bg-opacity-30">
                                    <label
                                        htmlFor="price"
                                        className="text-sm font-medium block my-2"
                                    >
                                        Introduction
                                    </label>
                                    <input
                                        type="text"
                                        className="shadow-sm bg-gray-900 bg-opacity-30 border border-gray-300 text-gray-300 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder="Intro to your blog"
                                        value={formData.intro}
                                        onChange={(e) =>
                                        setFormData({ ...formData, intro: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="w-5/6">
                                    <label
                                        htmlFor="price"
                                        className="text-sm font-medium block my-2"
                                    >
                                        Content of the Blog
                                    </label>
                                    <div className="bg-gray-900 bg-opacity-30">
                                        <EditorComponent data={formData.description} formData={formData} setFormData={setFormData} onChange={(e) => {console.log('hai')}} editorblock="editorjs-container" />
                                    </div>
                                    
                                </div>
                                <button type="submit" className="mt-7 border font-semibold px-6 py-1 rounded bg-slate-500 hover:bg-slate-600">
                                    Post Blog
                                </button>
                    </div>
                </div>
            </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default CreateBlog