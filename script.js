const baseUrl =
  "https://lit-earth-42250.herokuapp.com/https://www.themealdb.com/api/json/v1/1/";

const inputSearch = document.getElementById("search-input");
const resultsTitle = document.getElementById("results-title");
const miscellaneous = document.getElementById("miscellaneous");
const ingredients = document.getElementById("ingredients");
const instructions = document.getElementById("instructions");
const cards = document.getElementById("cards");
const selectedMeal = document.getElementById("selected-meal");

function search() {
  init();
  cards.innerText = "";
  let searched = inputSearch.value;

  fetch(baseUrl + "search.php?s=" + searched) //Arrabiata
    .then((response) => {
      if (response.status !== 200) {
        console.log("there was a problem. Status Code: " + response.status);
        return;
      }
      response.json().then((data) => {
        console.log(data.meals);
        updateResults(data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error", err);
    });
}

function randomSearch() {
  init();
  cards.innerText = "";
  let searched = inputSearch.value;

  fetch(baseUrl + "/random.php")
    .then((response) => {
      if (response.status !== 200) {
        console.log("there was a problem. Status Code: " + response.status);
        return;
      }
      response.json().then((data) => {
        console.log(data.meals);
        showSelectedMeal(data.meals[0]);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error", err);
    });
}

function updateResultTitle(meal) {
  resultsTitle.innerText = meal.strMeal;
}

function updateInstructions(meal) {
  instructions.innerText = meal.strInstructions;
}

function updateIngredients(meal) {
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      let ing = document.createElement("div");
      ing.innerText = `${meal[`strIngredient${i}`]} - ${
        meal[`strMeasure${i}`]
      }`;
      ing.className = "ingredient";
      ingredients.appendChild(ing);
    } else {
      break;
    }
  }
}

function createCards(meal) {
  let card = document.createElement("div");
  let img = document.createElement("img");
  img.setAttribute("src", meal.strMealThumb);
  img.className = "result-image";
  card.className = "card";
  let cardTitle = document.createElement("div");
  cardTitle.innerText = meal.strMeal;
  cardTitle.className = "cardTitle";
  card.appendChild(cardTitle);
  card.appendChild(img);
  card.addEventListener("click", () => showSelectedMeal(meal));
  return card;
}

function createInfoCard(meal) {
  let card = document.createElement("div");
  let img = document.createElement("img");
  img.setAttribute("src", meal.strMealThumb);
  img.className = "info-image";
  card.appendChild(img);
  return card;
}

function updateResults(data) {
  data.meals.forEach((meal) => {
    let card = createCards(meal);
    cards.appendChild(card);
  });
}

function updateMiscellaneous(meal) {
  miscellaneous.innerText = meal.strArea;
  miscellaneous.innerText += " " + meal.strCategory;
}

function init() {
  resultsTitle.innerText = "";
  miscellaneous.innerText = "";
  ingredients.innerText = "";
  instructions.innerText = "";
  selectedMeal.innerText = "";
}

function showSelectedMeal(meal) {
  init();
  updateMiscellaneous(meal);
  updateInstructions(meal);
  updateIngredients(meal);
  updateResultTitle(meal);
  updateSelectedMeal(meal);
  resultsTitle.scrollIntoView();
}

function updateSelectedMeal(meal) {
  let card = createInfoCard(meal);
  selectedMeal.appendChild(card);
}
