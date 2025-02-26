import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/AdminHeader.jsx';
import Footer from '../components/AminFooter.jsx';

export default function AdminLayout() {
  return(
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}