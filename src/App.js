import "./styles.css";
import React, { useState } from "react";
import axios from "axios";
import RecipeDetails from "./RecipeDetails";
import { db, auth } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import Auth from "./Auth";

export default function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
          params: {
            ingredients: ingredients,
            number: 10,
            apiKey: "fad5b807734a440886f7bd1f5ab69be6",
          },
        }
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  };
  const fetchRecipeDetails = async (recipeId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        { params: { apiKey: "fad5b807734a440886f7bd1f5ab69be6" } }
      );
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe details: ", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold my-4">Recipe Finder</h1>{" "}
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (comma separated)"
        className="p-2 border border-gray-300 rounded mb-4"
      />{" "}
      <button
        onClick={fetchRecipes}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search Recipes
      </button>{" "}
      <div className="mt-6 w-full max-w-2xl">
        {" "}
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-4 rounded shadow mb-4">
            {" "}
            <h2 className="text-2xl font-semibold">{recipe.title}</h2>{" "}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-auto mt-2 rounded"
            />{" "}
            <button
              onClick={() => fetchRecipeDetails(recipe.id)}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              {" "}
              View Details{" "}
            </button>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}{" "}
    </div>
  );
}
