import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignIn from './Pages/Login/SignIn';
import SignUp from './Pages/Login/SignUp';
import Home from './Pages/Home/Home';
import Edit from './Pages/Edit/Edit';
import './index.css';
import Layout from './Layout';
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login />}> 
          <Route path='/' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
        </Route>

        <Route path='/user/:id' element={<Home />}/>
        <Route path='/user/edit/:id' element={<Edit />}/>
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);