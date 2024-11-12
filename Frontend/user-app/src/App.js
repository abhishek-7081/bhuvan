import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Cardlu from './components/Card';
import Category from './pages/category';
import Bigcard from './components/bigcard';
import Create from './components/create';
import Createpage from './pages/createpage';
import CategoryPage from './components/categoerypage.js';
import CategoryList from './components/categorylsit';
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