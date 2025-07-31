import React from "react"

export default function IngredientsList(props) {
    // Map over the ingredients to create list items
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {ingredientsListItems}
            </ul>

            {/* Display the recipe container and button only if there are more than 3 ingredients */}
            {props.ingredients.length > 3 && 
                <div className="get-recipe-container">
                    <div ref={props.ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    {/* The button's text and disabled state are now controlled by the isLoading prop */}
                    <button 
                        onClick={props.getRecipe}
                        disabled={props.isLoading} // Disable the button when loading
                    >
                        {props.isLoading ? "Loading..." : "Get a recipe"}
                    </button>
                </div>
            }
        </section>
    )
}
