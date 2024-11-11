import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home.js';
import Cardlu from './components/Card.js';
import Category from './pages/category.js';
import Bigcard from './components/bigcard.js';
import Create from './components/create.js';
import Createpage from './pages/createpage.js';
import CategoryPage from './components/categoerypage.js';
import CategoryList from './components/categorylsit.js';
import Aboutpage from './pages/aboutpage.js';



const App = () => {
  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={< Home />} />
        <Route path="/cards" element={< Cardlu />} />
        <Route path="/category" element={<Category />} />
        <Route path="/bigcard" element={<Bigcard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/createpage" element={<Createpage />} />


        <Route path="/categories" element={<CategoryList />} />
        <Route path="/category/:category" element={<CategoryPage />} />


        <Route path="/about" element={<Aboutpage />} />
      


      </Routes>
    </BrowserRouter>





  )
}

export default App