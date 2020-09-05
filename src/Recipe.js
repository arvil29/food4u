import React from 'react';
import style from "./recipe.module.css"

//displays every single individual recipe from api
//info is passed in from App.js
//accessed from App.js whenever <Recipe> obj is used
const Recipe = ({title, calories, image, ingredients}) => {
    return(
        <div className={style.recipe}>
            <h1 style={{color: "#34495E"}}>{title}</h1>
            <ol>
                {ingredients.map(ingredient => (
                    <li className={style.ingredients} style={{fontFamily: "FiraSans"}}>{ingredient.text}</li>
                ))}
            </ol>
            <p style={{fontWeight: "bold"}}>Calories: {Math.round(calories)}</p>
            <img className={style.image} src={image} alt=""/>
        </div>
    );
};

export default Recipe;