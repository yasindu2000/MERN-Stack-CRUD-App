import React from 'react'
import Home from './components/Home'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import PostDetails from './components/PostDetails'
import NavBar from './components/NavBar'


function App() {
  return (

    <BrowserRouter>
   
    <div className='container'>
      <NavBar/>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/add' element={<CreatePost/>}/>
       <Route path='/edit/:id' element={<EditPost/>}/>
       <Route path='/post/:id' element={<PostDetails/>}/>

    </Routes>
    </div>
    
    </BrowserRouter>
  )
}

export default App