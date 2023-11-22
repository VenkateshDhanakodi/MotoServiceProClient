import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import AuthPage from './Components/Auth Pages/AuthPage';
import NavBar from './Components/NavBar';
import BookService from './Components/Booking Component/BookService';
import ServiceComponent from './Components/Service Component/ServiceComponent';
import CheckoutPage from './Components/Booking Component/CheckoutPage';
import ResetPasswordPage from './Components/Auth Pages/ResetPasswordPage';
import ResetPasswordRouting from './Components/Auth Pages/ResetPasswordRouting';

// export const port = "http://localhost:3377";
export const port = "https://motoserviceproserver.onrender.com";

function App() {
  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <NavBar />
        <br /><br />
        <Routes>
          <Route path='/signin' element={<AuthPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/service-booking/:category' element={<BookService />} />
          <Route path='/service' element={<ServiceComponent />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/reset-password/routing/:token' element={<ResetPasswordRouting />} />
          <Route path='/updatePassword/:token' element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
