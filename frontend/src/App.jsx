import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Signin from './pages/Signup'
import StartupDashboard from './pages/StartupDashboard'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Signin />} path='/signin'/>
      <Route element={<StartupDashboard />} path="/startup/dashboard"/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
