// Page Function for Fridge2Food

// variable declarations
var searchButtonEl = document.querySelector("#search-btn")

// search form input capture
var formSubmitHandler = function(event) {
    event.preventDefault();

    var searchInputEl = document.querySelector("#ingredient-input")
    // get value from input form
    var selectedIngredient = searchInputEl.value.trim();

    searchInputEl.value = "";

    console.log(selectedIngredient);
};



// Spoonacular API fetch


// UI Section
searchButtonEl.addEventListener("click", formSubmitHandler);