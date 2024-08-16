import { useState } from 'react'
import Header from './components/Header'
import InitialContent from './components/InitialContent'
import Main from './components/Main'
import BlogPage from './components/BlogPage'
import SearchContent from './components/SearchContent'
import Blog from './components/Blog'

function App() {

  return (
    <>
      <Header />
      <InitialContent />
      <Main />
      <SearchContent />
      <BlogPage />
      
    </>
  )
}

export default App
