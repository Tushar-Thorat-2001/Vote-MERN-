import React from 'react'
import {Routes, Route} from "react-router-dom"
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Voter from './pages/Voter'
import Completed from './pages/Completed'
import Admin from './pages/Admin'
import CreateCandidate from './pages/CreateCandidate'

const App = () => {
  return (
   <>
    <Routes>

      <Route path="/" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/vote" element={<Voter/>}/>
      <Route path="/completed" element={<Completed/>}/>
      <Route path="/admin" element={<Admin/>} />
      <Route  path="/create" element={<CreateCandidate/>} />
     

    </Routes>
   </>
  )
}

export default App