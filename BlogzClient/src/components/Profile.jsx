import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import profile from '../assets/userAvathar.svg'
import { useSelector,useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import notify from "../Utils/notifier/Notifier";
import { ToastContainer } from "react-toastify";
   
function Profile() {

    const state = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signoutHandler = async () => {
        console.log('I am Done!')
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/user/signout`, {
            method: "POST",
          });
          const data = await res.json();
          if (res.ok) {
            notify('success',200)
            navigate('/')
            dispatch(signoutSuccess());
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    return (
     <Menu
        animate={{
          mount: { y: 10 },
          unmount: { y: 40 },
        }}
      >
        
        {
            state.currentUser ? <>
                <MenuHandler>
                    <img className={`${state.currentUser.profilePicture ? 'w-10 h-9 rounded cursor-pointer' : 'w-10 bg-white bg-opacity-30 rounded-xl cursor-pointer p-2'}`} src={state.currentUser.profilePicture?state.currentUser.profilePicture:profile} alt="" />
                </MenuHandler>
                <MenuList className="text-black">
                <MenuItem className="text-lg">👋 {state.currentUser.username}</MenuItem>
                <MenuItem className="hover:bg-slate-200 flex flex-row items-center my-1">
                    <img className="w-4" src={profile} alt="" />
                    <span className="px-2 py-1">profile</span>
                </MenuItem>
                <MenuItem 
                    className="hover:bg-red-200 flex flex-row items-center"
                    onClick={() => {
                        signoutHandler()
                        }}>
                    <img className="w-4" src='https://img.icons8.com/ios-filled/50/exit.png' alt="exit"/>
                    <span className="px-2 py-1">sign out</span>
                </MenuItem>
                </MenuList>
            </> : <div className="px-2 py-1 bg-slate-300 bg-opacity-35 rounded-lg">
                <button 
                    className="hover:underline hover:text-black flex flex-row items-center rounded-lg py-1 px-2"
                    onClick={() => {
                        navigate('/signin')
                        }}>
                    <span className="px-2">Sign in</span>
                </button>
            </div>
        }
        
      </Menu>
    );
  }

export default Profile
  