// src/ai.js
// This file is now responsible for making a request to our own backend server.
export async function getRecipeFromMistral(ingredientsArr) {
    console.log("Attempting to get recipe from our backend with ingredients:", ingredientsArr);

    try {
        const response = await fetch('https://chef-ai-server.onrender.com/api/generate-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsArr }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Backend response:", data);
        
        return data.recipe;

    } catch (err) {
        console.error("Error fetching recipe from our backend:", err);
        return "Failed to get recipe from AI. Please check your server and try again.";
    }
}