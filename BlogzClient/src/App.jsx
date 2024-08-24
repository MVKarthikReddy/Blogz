import { useState } from 'react'
import Header from './components/Header'
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import LoginNSignup from './components/LoginNSignup';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import BlogPage from './components/BlogPage'
import SideHeader from "./components/SideHeader";
import AllBlogs from './pages/AllBlogs';
import Navbar from './pages/Navbar';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<LoginNSignup option={"signup"} />} />
        <Route path="/signin" element={<LoginNSignup option={"signin"} />} />
        <Route path="/blogs" element={<AllBlogs />  } />
        <Route path="/blogs/:id" element={<Blogs /> } />
        <Route path='/create-blog' element={<CreateBlog /> } />

      </Routes>
      <ToastContainer />
      
    </>
  )
}

export default App
