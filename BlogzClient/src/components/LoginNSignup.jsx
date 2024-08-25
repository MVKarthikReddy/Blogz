import { useState } from 'react'
import { useActionData, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import notify from '../Utils/notifier/Notifier';
import logo from '../assets/logo.png'

import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import axios from 'axios'
const LoginNSignup = (props) => {

    const navigate = useNavigate()

    const {loading,error:errorMessage} =useSelector(state => state.user);
    //why we  are using selector here? because we want to access 
    const dispatch =useDispatch();

    // console.log(props.option)
    const [option,setOption] = useState(props.option)

    const [data,setData] = useState({
        username: '',
        email: '',
        password: '',
        cnfPass: ''
    })

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const api_url = `${import.meta.env.VITE_BACKEND_API_URL}`
        console.log(api_url)
        // console.log(`${import.meta.env.VITE_BACKEND_API_URL}${option=='signin' ? '/api/auth/signin' : '/api/auth/signup'}`)
        const {username,email,password} = data
        if(option == 'signin'){
            if(!email || !password){
                return  dispatch(signInFailure("Please fill all fields!"));
            }
            
        }
        else{
            if(!username || !email || !password){
                alert('enter all the fileds')
                return
            }
            
        }

        if(option == 'signin' || option == 'signup'){
            
                const response = await fetch(`${api_url}${option=='signin' ? '/api/auth/signin' : '/api/auth/signup'}`, 
                    {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data),
                    }
                )
                
                console.log(response)

                if(option == 'signup'){
                    setOption('signin')
                    navigate('/signin')
                }
                else{
                    
                    if(response.status !== 200){
                        notify("User not found",404)
                        dispatch(signInFailure(response.statusText));
                    }
                    if(response.statusText == "OK"){
                        
                        dispatch(signInSuccess(response.data));
                        navigate('/');
                      }
                    
                }
        
        }
    }
    

    

    return(
        <>
        <div className='-z-10 absolute w-11/12 right-0 top-28'>
        <section className="bg-white dark:bg-gray-900 dark:bg-opacity-25 py-5">
            <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full max-w-md" onSubmit={(e) => {handleSubmit(e)}}>
                    <div className="w-2/6 h-14 mt-4 flex justify-center mx-auto">
                        <img className="w-auto h-full rounded-xl border" src={logo} alt="hello" />
                    </div>
                    
                    <div className="flex items-center justify-center mt-6">
                        <a onClick={() => {
                                setOption('signin')
                                navigate('/signin')
                                }} 
                                className={`cursor-pointer w-1/3 pb-4 font-medium text-center text-gray-500 capitalize ${option=='signin' ? 'border-b-2 border-blue-500 dark:border-blue-400 dark:text-white' : 'border-b dark:border-gray-400 dark:text-gray-300'}`} >
                            sign in
                        </a>

                        <a onClick={() => {
                            setOption('signup')
                            navigate('/signup')
                            }} 
                            className={`cursor-pointer w-1/3 pb-4 font-medium text-center text-gray-800 capitalize ${option=='signup' ? 'border-b-2 border-blue-500 dark:border-blue-400 dark:text-white' : 'border-b dark:border-gray-400 dark:text-gray-300'}`}>
                            sign up
                        </a>
                    </div>

                    {
                        option=="signup" ? <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>

                            <input 
                                type="text" 
                                id='username'
                                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                                placeholder="Username"
                                value={data.username}
                                onChange={(e) => {
                                    setData({...data,[e.target.id]:e.target.value.trim() })
                                }}
                                />
                        </div> : <></>
                    }


                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input 
                            type="email" 
                            id='email'
                            className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                            placeholder="Email address" 
                            value={data.email}
                            onChange={(e) => {
                                setData({...data,[e.target.id]:e.target.value.trim() })
                            }}
                            />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input 
                            type="password" 
                            id='password'
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                            placeholder="Password" 
                            value={data.password}
                            onChange={(e) => {
                                setData({...data,[e.target.id]:e.target.value.trim() })
                            }}
                            />
                    </div>

                    {option=="signup" ? <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input 
                            type="password" 
                            id='cnfPass'
                            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" 
                            placeholder="Confirm Password" 
                            value={data.cnfPass}
                            onChange={(e) => {
                                setData({...data,[e.target.id]:e.target.value.trim() })
                            }}
                            />
                    </div> : <></>}

                    <div className="mt-6">
                        <button 
                            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            type='submit'
                        >
                            {option=='signup'? "Sign Up" : "Sign In"}
                        </button>

                        {option=='signup' ? <div onClick={
                            () => {
                                setOption("signin")
                                navigate('/signin')
                            }
                        } className="mt-6 text-center">
                            <a className="cursor-pointer text-sm text-blue-500 hover:underline dark:text-blue-400">
                                Already have an account?
                            </a>
                        </div> : <></>}
                    </div>
                </form>
            </div>
        </section>
        <ToastContainer />
        </div>
    </>
    )
}

export default LoginNSignup