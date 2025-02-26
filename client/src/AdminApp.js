// import React from 'react';
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/AdminLayout.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminMain from './pages/AdminMain.jsx';
import AdminRegiProduct from './pages/AdminRegiProduct.jsx';
import { AuthProvider } from './auth/AuthContext.js';
import PrivateRoute from './auth/PrivateRoute.js';
import './styles/adminlogin.css';

function AdminApp() {

  return (
    <div className="adminLogin-wrap">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AdminLayout />}>
                <Route path='/admin/login' element={<AdminLogin />} />
                <Route element={<PrivateRoute />}>
                  <Route index element={<AdminMain />} />
                  <Route path='/admin/register' element={<AdminRegiProduct />} />
                </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default AdminApp;