import { useState } from 'react'
import Header from './components/Header'
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import LoginNSignup from './components/LoginNSignup';
import Blogs from './components/Blogs';
// import {Blogs} from './components/Blogs'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<LoginNSignup option={"signup"} />} />
        <Route path="/signin" element={<LoginNSignup option={"signin"} />} />
        <Route path="/blogs" element={<Blogs /> } />

      </Routes>
    </>
  )
}

export default App
