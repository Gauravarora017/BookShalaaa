import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Home from './pages/Home/Home';
import Home1 from './pages/Home/Home1';
import About from "./pages/About/About";
import Login from './components/Login/login';
import Signup from './components/Login/signup';
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Cart from './components/Cart/Cart'

import { CartProvider } from './Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "login" element = {<Login />}/>
        <Route path = "signup" element = {<Signup />}/>
        <Route path = "home1" element = {<Home1 />} >
          <Route path = "about" element = {<About />} />
          <Route path = "book" element = {<BookList />} />
          <Route path = "book/:id" element = {<BookDetails />} />
          </Route>
          <Route path = "home1/cart" element = {<Cart />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  </AppProvider>
);
