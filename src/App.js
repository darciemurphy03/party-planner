import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import CocktailList from './components/CocktailList';
import CocktailDetails from './components/CocktailDetails';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Recipes from './components/Recipes';
import MealDetails from './components/MealDetails';

function App() {
  return (
    <Router>
      <div className='bg-background bg-cover bg-center h-full w-full font-comfortaa min-h-screen'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cocktails" element={<CocktailList />} />
          <Route path="/cocktail-details" element={<CocktailDetails />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/meal-details" element={<MealDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
