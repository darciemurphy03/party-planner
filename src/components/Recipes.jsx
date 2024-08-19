import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner.jsx';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      setRecipes(response.data.meals || []); // Default to empty array if no meals
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleClick = (id) => {
    navigate('/meal-details', { state: { id } });
  };

  return (
    <>
      <Banner title={"Food Menu"} />
      <div className='flex flex-col items-center'>
        <input
          type="text"
          placeholder="Search for a meal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='flex p-3 px-8 m-4 mb-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-900'
        />
        <div className="flex flex-wrap">
          {recipes.length > 0 ? (
            recipes.map((meal) => (
              <button
                key={meal.idMeal}
                className="w-1/2 sm:w-1/3 lg:w-1/4 p-3 box-border"
                onClick={() => handleClick(meal.idMeal)}
              >
                <div className="bg-[#6a3e67] rounded-md p-0 m-0 shadow-xl">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-auto object-cover rounded-md"
                  />
                  <div className='px-4 py-2'>
                    <h1 className="text-lg text-white font-semibold">{meal.strMeal}</h1>
                    <p className="mt-2 text-xs text-white">Category: {meal.strCategory}</p>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <p>No meals found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Recipes;
