import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import notify from "../Utils/notifier/Notifier";
import { useDispatch,useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { Tooltip } from "@material-tailwind/react";
import home from '../assets/home.png'
import about from '../assets/about.png'
import blogs from '../assets/blogs.png'
import my_blogs from '../assets/my_blogs.png'
import write_blog from '../assets/write_blog.png'
import account from  '../assets/account.png'
import logout from '../assets/logout.png'
import logo from '../assets/logo.png'


const SideHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector((state) => state.user)
  const Menus = [
    { title: "Home", src: home, url:'/' },
    { title: "About", src: about, url:'/about' },
    { title: "All Blogs", src: blogs, url:'/blogs', gap: true },
    { title: "My Blogs ", src: my_blogs, url:'/my-blogs' },
    { title: "Post Blog", src: write_blog, url:'/create-blog' },
    { title: "Account ", src: account, url:'/account', gap: true },
    { title: "Log Out", src: logout,},
  ];

  const signoutHandler = async () => {
    console.log('I am Done!')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        notify('success',200)
        
        dispatch(signoutSuccess());
      } else {
        console.log(data.message);      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`${open?'w-1/6':'w-20'} flex fixed`}>
      <div
        className={` ${
          open ? "w-full duration-500" : "w-20 duration-500"
        } bg-dark-purple h-screen p-5  pt-8 relative`}
      >
        
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`rounded-lg cursor-pointer duration-500 w-12 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white text-2xl origin-left font-medium duration-200 `}
          >
            Blogz
          </h1>
        </div>
        <ul className="mt-3 pt-20 backdrop-blur-sm">
          {Menus.map((Menu, index) => (
            
                <li
                    key={index}
                    className={`${Menu.gap ? "mt-10" : "mt-2"} ${index === 0 && "bg-light-white"}  ${Menu.title == "Log Out" && !state.currentUser ? 'hidden' : ''} ${Menu.url == "/account" && !state.currentUser ? 'hidden' : ''}`}
                    onClick={() => {
                        if(Menu.url){
                            if(Menu.url=='/create-blog' && !state.currentUser){
                                notify('Please sign in to post a blog',409)  
                            }
                            else{
                                navigate(Menu.url)
                            }
                            
                        }
                        if(Menu.title == "Log Out"){
                            signoutHandler()
                        }
                        
                    }}
                    >
                    <Tooltip content={!open ? Menu.title : ''} placement="right">
                        <div className="flex bg-gray-600 bg-opacity-60 rounded-md p-2 duration-500 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                                
                            <img src={Menu.src}  className="w-6 "/>
                                
                            <span className={`${!open && "hidden"} origin-left duration-700`}>
                                {Menu.title}
                            </span>
                            
                        </div>
                    </Tooltip>
                    
                </li>
            
          ))}
        </ul>
        <FaAngleLeft 
            className={`absolute cursor-pointer -right-3 top-28 w-7 h-7 rounded-full duration-500 text-gray-400 opacity-40 ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
            
          />
      </div>
      
    </div>
  );
};
export default SideHeader;