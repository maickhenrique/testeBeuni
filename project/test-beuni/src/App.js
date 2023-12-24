import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetails from './components/Products/ProductDetails';
import Header from './components/Header/Header';
import Home from './components/Home';
import Shop from './components/Shop';

const App = () => {

  return (
    <>
    <Header />
    <hr />
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/index" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
    </>

  );
};

export default App;
