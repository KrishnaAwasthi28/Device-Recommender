import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import Recommendations from './components/Recommendations'
import Devices from './components/Devices'

function App() {

  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/form/:deviceType' element={<Form/>}></Route>
      <Route path='/recommendations/:deviceType' element={<Recommendations />} />
      <Route path='/devices' element={<Devices/>}></Route>
    </Routes>
    </>
  )
}

export default App
