import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Principal } from './pages/Principal'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Productos } from './pages/Productos'
import { Compras } from './pages/Compras'

import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminProducts } from './pages/admin/AdminProducts';

import { AdminRoute } from './componentes/AdminRoute'

import './App.css'


function App() {

  return (
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path='/compras' element={<Compras />} />    


        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="usuarios" element={<AdminUsers />} />
            <Route path="pedidos" element={<AdminOrders />} />
            <Route path="productos" element={<AdminProducts />} />
          </Route>
        </Route>

        </Routes>
    
  )

}

export default App
