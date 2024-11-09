// src/RecipeDetails.js

import React from "react";

const RecipeDetails = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{recipe.title}</h2>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Close
          </button>
        </div>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-auto rounded mb-4"
        />
        <h3 className="text-xl font-semibold">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold">Instructions:</h3>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
