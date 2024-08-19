
import InitialContent from '../components/InitialContent'
import Main from '../components/Main'
import React from 'react'
import SearchContent from '../components/SearchContent'
import BlogPage from '../components/BlogPage'

export const Home = () => {
  return (
    <>
        <InitialContent />
        <Main />
        <SearchContent />
        <BlogPage />
    </>
  )
}
