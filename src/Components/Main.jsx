// src/components/Main.jsx
import React from "react"
import IngredientsList from "./IngredientsList.jsx"
import ClaudeRecipe from "./ClaudeRecipe.jsx"
import { getRecipeFromMistral } from "../ai.js"
import shravanPic from "../assets/shravan.jpeg";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
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
        const newIngredient = formData.get("ingredient")?.trim();
        if (!newIngredient) return; // Ignore empty or whitespace-only input
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    }
    
    function clearIngredients() {
        setIngredients([]);
        setRecipe("");
    }

    return (
    <>
        <main>
            {/* --- DESCRIPTION BOX START --- */}
            <div
    style={{
        background: "#f9f7f2",
        border: "1px solid #ece5da",
        borderRadius: "8px",
        padding: "1.2rem 1.5rem",
        margin: "2rem auto 2.5rem auto",
        maxWidth: "600px",
        color: "#333",
        fontSize: "1.1rem",
        boxShadow: "0 2px 8px 0 #00000012"
    }}
>
    <strong>Chef AI 🍳</strong> helps you turn the ingredients you have at home into delicious, AI-powered recipe ideas.
    <br />
    <span style={{ color: "#555", fontSize: "0.98em" }}>
        Just enter what you have in your kitchen and let Chef AI recommend a creative recipe for you!
        <br />
        <span style={{ color: "#c62d08", fontWeight: 600 }}>Please add at least 4 ingredients for best results.</span>
    </span>
</div>

            {/* --- DESCRIPTION BOX END --- */}

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
        
        {/* --- CREATOR BOX FLOATING --- */}
            <div
    style={{
        position: "fixed",
        left: "50%",
        bottom: 16,
        transform: "translateX(-50%)",
        padding: "14px 22px",
        background: "#fafbfc",
        border: "1px solid #ececec",
        borderRadius: 14,
        boxShadow: "0 2px 8px rgba(0,0,0,0.09)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        minWidth: 180,
        maxWidth: "90vw",
        fontSize: "1rem"
    }}
>
    <img
        src={shravanPic}
        alt="Shravan Venkat"
        style={{
            width: 44,
            height: 44,
            objectFit: "cover",
            marginRight: 13,
            border: "1px solid #e4e4e4",
            background: "#fff"
        }}
    />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        <span style={{ fontWeight: 600, fontSize: 13, color: "#585858" }}>Creator:</span>
        <span style={{ fontWeight: 500, fontSize: 16, color: "#222" }}>Shravan Venkat</span>
    </div>
</div>
        {/* --- END CREATOR BOX --- */}
    </>
)
}