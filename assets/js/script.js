// Page Function for Fridge2Food

// variable declarations
var searchButtonEl = $("#search-btn")
var randomButtonEl = $("#random-btn")
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
                
                
                

                $(listItemEl).html("<div class='card card-content'> <div class='card-image'> <img src=" + recipeImgURL + "></div> <div class= 'title is-4'> Recipe Title: " + recipeTitle + "</div> <footer class='card-footer'> <a href=" + recipeLink + " class= 'card-footer-item' target= 'b'> Recipe Link </a></footer> </div>");
            }
        })
        .catch(err => console.error(err));
};

// Random  Recipe API from TheMealDB API - www.themealdb.com/api/json/v1/1/random.php 
function getRandomRecipe (event) {
    event.preventDefault();

    var queryURL = "https://www.themealdb.com/api/json/v1/1/random.php";$.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response.meals);

        for (i=0; 1 < response.meals; 1++) {
            var randomTitle = response.meals.strMeal
            var randomImgURL = response.meals.strMealThumb
            var randomLink = response.meals.strSource
            var randomCategory = response.meals.strCategory
            var randomVideo = response.meals.strYoutube

            // // creating elements for list item
            var listItemEl = document.createElement("li");
            $(listItemEl).attr("class", "results-list-item");
            $(listItemEl).attr("id", "results-list-item-0");
            $(resultListEl).append(listItemEl);

            $(listItemEl).html("<div class='card card-content'> <div class='card-image'> <img src=" + randomImgURL + "></div>")

        };
    });

    
};

// Modal Removal Function
function modalClickOff () {
    ingredientModal.hide();
};

// UI Section
searchButtonEl.on("click", formSubmitHandler);

randomButtonEl.on("click", getRandomRecipe);

modalClose.on("click", modalClickOff);
    
// Navbar toggle
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });

  $(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });
  });