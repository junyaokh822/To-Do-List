import React from 'react';
import Navbar from './Navbar';
import Home from './pages/Home'
import About from './pages/About'
import {Route, Routes} from "react-router-dom"
import NotePage from './NotePage';


function App() {
  return (
  <>
  <Navbar />
  <div className="container">
    <Routes>
      <Route path="/" element ={<Home />}/>
      <Route path="/About" element ={<About />}/>
      <Route path="/notes/:id" element={<NotePage />} />
    </Routes>
  </div>
  </>
  )
}

export default App;