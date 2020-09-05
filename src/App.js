import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from "./Recipe";
import logo from "./logo.png";


const App = () => {
  const APP_ID = "58e90476";
  const APP_KEY = "2a9a84ead8ffd06632b15d340b660668";

  //create state for getting recipes
  //every recipe call made from api stored inside recipes array
  //we're taking data from this state and passing it down to props
  const [recipes, setRecipes] = useState([]);

  //create state for search & set search to empty string
  const [search, setSearch] = useState("")

  //get query name to set into url to fetch
  const [query, setQuery] = useState("");

  //put query into useEffect so page is rendered only when search button clicked & query string is changed
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    //stores recipes from data.hits
    //hits is a component of json data retrieved --> check console in browser
    setRecipes(data.hits);
    console.log(data.hits);
  };

  //function to update search box w/ typed data
  //we get event from this
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  //set query to whatever was typed inside searchbar
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  //'recipe' prop is defined below
  //every recipe is stored from recipes gotten above into recipe prop
  //2 components are returned 1st is form & 2nd is recipes
    return (
      <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input placeHolder="Find recipe..." className="search-bar" type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        
        <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories} 
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
          />
        ))}
        </div>
      </div>
      );
  };
    

export default App;
