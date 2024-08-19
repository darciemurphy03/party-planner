import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const MealDetails = () => {
  const { state } = useLocation();
  const { id } = state || {};
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMealDetails = async () => {
      setLoading(true);
      setError(null);

      if (id) {
        try {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          if (response.data.meals && response.data.meals.length > 0) {
            setMeal(response.data.meals[0]);
          } else {
            setError('No meal details found.');
          }
        } catch (error) {
          setError('Error fetching meal details.');
          console.error('Error fetching meal details:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setError('No meal ID provided.');
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({
          ingredient,
          measure: measure || '',
        });
      }
    }
    return ingredients;
  };

  const splitInstructions = (instructions) => {
    // Split instructions by period followed by a space or newline
    return instructions.split(/\. +|\n/).filter(sentence => sentence.trim() !== '');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!meal) {
    return <p>No meal details available.</p>;
  }

  const ingredients = getIngredients(meal);
  const instructions = splitInstructions(meal.strInstructions);

  const handleReturn = () => {
    navigate('/recipes');
  };

  return (
    <>
      <button
        onClick={handleReturn}
        className='bg-gray-700 text-white hover:bg-pink-500 rounded-md m-5 p-2 flex items-center'
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Return
      </button>
      <div className="p-4 flex flex-col items-center">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full max-w-5xl mx-auto">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="mb-4 rounded-md shadow-lg w-full sm:w-1/2 lg:w-1/3"
          />
          <div className="flex-1 flex items-center justify-center text-center px-4">
            <h1 className="text-4xl font-kalnia md:text-5xl lg:text-7xl font-bold mb-4 max-w-full break-words">
              {meal.strMeal}
            </h1>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center bg-slate-200 p-4 rounded-md">
            <button className="bg-gray-700 hover:bg-[#ba9dd6] border-purple-400 shadow-md border text-white p-2 px-4 rounded-md m-6 w-32">
              Add to...
            </button>
            <button className="bg-gray-700 hover:bg-[#ba9dd6] border-purple-400 shadow-md border text-white p-2 px-4 rounded-md m-6 w-32">
              Favourite
            </button>
          </div>
        </div>

        <div className="bg-slate-200 p-3 rounded-md shadow-lg mt-10 w-full max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mt-4">Ingredients:</h2>
          <ul className="list-disc pl-5">
            {ingredients.map((item, index) => (
              <li key={index} className="flex items-center mb-2 text-lg">
                <span>{item.measure} {item.ingredient}</span>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mt-12">Instructions:</h2>
          <ul className="list-disc pl-5">
            {instructions.map((instruction, index) => (
              <li key={index} className="text-lg mb-2">
                {instruction.trim()}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:hidden flex flex-col items-center justify-center p-4 rounded-md bg-slate-200 mt-6 w-full max-w-5xl mx-auto">
          <button className="bg-gray-700 hover:bg-[#ba9dd6] border-purple-400 shadow-md border text-white p-2 px-4 rounded-md m-6 w-32">
            Add to...
          </button>
          <button className="bg-gray-700 hover:bg-[#ba9dd6] border-purple-400 shadow-md border text-white p-2 px-4 rounded-md m-6 w-32">
            Favourite
          </button>
        </div>
      </div>
    </>
  );
};

export default MealDetails;
