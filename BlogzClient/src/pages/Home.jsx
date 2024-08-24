
import InitialContent from '../components/InitialContent'
import Main from '../components/Main'
import {useState} from 'react'
import SearchContent from '../components/SearchContent'
import BlogPage from '../components/BlogPage'

import { useSelector } from 'react-redux'

export const Home = () => {
  const state = useSelector((state) => state.user);   
  return (
    <>
        <div className='-z-10 absolute w-11/12 right-0 top-28'>
          {/* {!state.currentUser ? <InitialContent /> : <></>} */}
          <Main />
          <BlogPage />
        </div>
    </>
  )
}
