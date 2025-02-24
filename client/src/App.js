import style from './styles/style.css';
import haon from './styles/haon.css';
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; //react-router-dom에서 제공하는 컴포넌트
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx'
import Carts from './pages/Carts.jsx';
import Person from './pages/Person.jsx';
import Products from './pages/Products.jsx';
import DetailProducts from './pages/DetailProducts.jsx';
import Order from './pages/Order.jsx';
import { AuthProvider } from './auth/AuthContext.js';
import OrderCancle from './components/person/OrderCancle.jsx';
import EditMember from './components/person/EditMember.jsx';
import ProductReview from './components/person/ProductReview.jsx';
import EditMyInfo from './components/person/MyInfo/EditMyInfo.jsx';
import UpdateInfo from './components/person/MyInfo/UpdateInfo.jsx';

function App() {
  return (
    <>
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}></Route>
                    <Route path='/all' element={<Products/>}></Route>    
                    <Route path='/login' element={<Login/>}></Route>    
                    <Route path='/signup' element={<Signup/>}></Route>    
                    <Route path='/carts' element={<Carts/>}></Route>    
                    <Route path='/person' element={<Person/>}></Route>
                    <Route path='/Person/orderChangeReturnCancle' element={<OrderCancle/>}></Route> 
                    <Route path='/Person/editMemberInfo' element={<EditMember/>}></Route>
                    <Route path='/Person/productReview' element={<ProductReview/>}></Route>
                    <Route path='/person/editMemberInfo/myinfo' element={<EditMyInfo/>}></Route>
                    <Route path='/person/editMemberInfo/updateInfo' element={<UpdateInfo/>}></Route>
                    <Route path={`/detail`} element={<DetailProducts/>}></Route>
                    <Route path='/order' element={<Order></Order>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
     </AuthProvider>
    </>
  );
}

export default App;
