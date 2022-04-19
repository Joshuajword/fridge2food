// Page Function for Fridge2Food

// variable declarations
var searchButtonEl = $("#search-btn")
var ingredientModal = $("#modal-ingredient-valid")
var modalBackground = $("#modal-background")
var modalClose = $(".modal-close")
var resultListEl = $("#results-list")

// search form input capture
var formSubmitHandler = function(event) {
    event.preventDefault();

    var searchInputEl = document.querySelector("#ingredient-input")
    // get value from input form
    var selectedIngredient = searchInputEl.value.trim();

    if (selectedIngredient === "") {
        ingredientModal.show();
    }
    else {
        searchInputEl.value = "";
        resultListEl.html("");
        searchRecipes(selectedIngredient);
        console.log(selectedIngredient);
    }
};

// Spoonacular API fetch
function searchRecipes(selectedIngredient) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '43dda05b68msh38dfcd1768261aep1ec752jsncd88e09d6779'
        }
    };

    fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query='+ selectedIngredient +'&instructionsRequired=true&ranking=2&addRecipeInformation=true&number=10&fillIngredients=true', options)
        .then(response => response.json())
        .then(function(response){
            console.log(response.results)

            // For loop for recipe list
            for ( i=0; i < response.results.length; i++) {
                // variable declaration
                var recipeTitle = response.results[i].title
                var recipeImgURL = response.results[i].image
                var recipeLink = response.results[i].sourceUrl
                var recipeSummary = response.results[i].summary

                // creating elements for list item
                var listItemEl = document.createElement("li");
                $(listItemEl).attr("class", "results-list-item");
                $(listItemEl).attr("id", "results-list-item-"+[i]);
                $(resultListEl).append(listItemEl);
                
                
                

                $(listItemEl).html("<div class='card card-content'><div class='card-image'><img src=" + recipeImgURL + "></div> Title: " + recipeTitle + "<br> <a class='button' href=" + recipeLink + " target= 'b'> Recipe Link </a>" + "</div");
            }
        })
        .catch(err => console.error(err));
};

// Modal Removal Function
function modalClickOff () {
    ingredientModal.hide();
};

// UI Section
searchButtonEl.on("click", formSubmitHandler);

modalClose.on("click", modalClickOff);
    

