import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner.jsx'

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchCocktails = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      setCocktails(response.data.drinks);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCocktails();
  }, [fetchCocktails]);

  const handleClick = (id) => {
    navigate('/cocktail-details', { state: { id } });
  };

  return (
    <>
   <Banner title={"Drinks Menu"}/>
    <div className='flex flex-col items-center'>
      <input
        type="text"
        placeholder="Search for a cocktail..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='flex p-3 px-8 m-4 mb-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900'
      />
      <div className="flex flex-wrap">
        {cocktails ? (
          cocktails.map((drink) => (
            <button
              key={drink.idDrink}
              className="w-1/2 sm:w-1/3 lg:w-1/4 p-3 box-border"
              onClick={() => handleClick(drink.idDrink)}
            >
              <div className="bg-[#6a3e67] rounded-md p-0 m-0 shadow-xl">
                <img
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  className="w-full h-auto object-cover rounded-md"
                />
                <div className='px-4 py-2'>
                  <h1 className="text-lg text-white font-semibold">{drink.strDrink}</h1>
                  <p className="mt-2 text-xs text-white">Category: {drink.strCategory}</p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p>No cocktails found</p>
        )}
      </div>
    </div>
    </>
  );
};

export default CocktailList;
