
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProductDetails from './ProductDetails';
import NavBar from '../components/NavBar';
export default function PageRoute() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
   
  );
}
