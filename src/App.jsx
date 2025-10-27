//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Principal } from './pages/Principal'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Productos } from './pages/Productos'
import { Compras } from './pages/Compras'
import { Admin } from './pages/Admin'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path='/compras' element={<Compras />} />    
        <Route path='/admin' element={<Admin />} />
              
        </Routes>
    </Router>
  )

}

export default App
