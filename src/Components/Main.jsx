// src/components/Main.jsx
import React from "react"
import IngredientsList from "./IngredientsList.jsx"
import ClaudeRecipe from "./ClaudeRecipe.jsx"
import { getRecipeFromMistral } from "../ai.js"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        []
    )
    const [recipe, setRecipe] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const recipeSection = React.useRef(null)
    
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
            window.scroll({
                top: yCoord,
                behavior: "smooth"
            })
        }
    }, [recipe])

    async function getRecipe() {
        setIsLoading(true);
        try {
            const recipeMarkdown = await getRecipeFromMistral(ingredients)
            setRecipe(recipeMarkdown)
        } catch (error) {
            console.error("Error generating recipe:", error);
        } finally {
            setIsLoading(false);
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    
    function clearIngredients() {
        setIngredients([]);
        setRecipe("");
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    isLoading={isLoading}
                />
            }

            {ingredients.length > 0 && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button onClick={clearIngredients} style={{
                        padding: '0.5rem 1rem',
                        fontSize: '1rem',
                        backgroundColor: '#000000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                    }}>
                        Clear all ingredients
                    </button>
                </div>
            )}

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}