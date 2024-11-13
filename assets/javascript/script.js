


const recipes = [
    { id: 1, name: "Spaghetti Bolognese", ingredients: ["spaghetti", "tomato sauce", "ground beef"], instructions: "Boil spaghetti, cook beef, add sauce." },
    { id: 2, name: "Caesar Salad", ingredients: ["lettuce", "croutons", "parmesan", "caesar dressing"], instructions: "Mix lettuce, add dressing, sprinkle cheese." }
    
];

function addRecipe() {
    

    const nameInput = prompt("Enter the name of the recipe");
    const ingredientsInput = prompt("Enter the ingredients, separated by commas");

    const recipe = {
        id: recipes.length + 1, // Unique ID based on the array length
        name: nameInput, // Recipe name
        ingredients: ingredientsInput.split(",").map(item => item.trim()) // Split into an array and trim whitespace
    };

    recipes.push(recipe); // Add the new recipe to the recipes array
    console.log(recipes); // Show the updated recipes array in the console

    alert("Recipe added!");
    displayRecipes();
}
document.getElementById("AddButton").addEventListener("click", addRecipe);




function deleteRecipe(){
   


}

function displayRecipes(filteredRecipes = recipes){
    //alert("hit");
const recipeBox = document.getElementById("displayRecipes");
    
    recipeBox.innerHTML = ""; //clears the recipbox
    //alert("hit");
    filteredRecipes.forEach(recipe => {
        const recipeElement = document.createElement("section");
        recipeElement.classList.add("recipe-item");
        recipeElement.textContent = recipe.name;
        
        recipeBox.appendChild(recipeElement);
        
    })
    
    

}


function toggleDisplay(){
    const recipeBox = document.getElementById("displayRecipes");
   
    if (recipeBox.style.display === "none"){
        recipeBox.style.display = "block";
        displayRecipes();
        
    }
    else {
        recipeBox.style.display = "none";
    }
}

document.getElementById("DisplayButton").addEventListener("click", toggleDisplay);


function filterRecipes(){
    //alert("hit");
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchInput));
    
        displayRecipes(filteredRecipes);
}