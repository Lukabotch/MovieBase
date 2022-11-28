import styles from "./style.css";

const APIKey = 29629339;
const movieInput = document.querySelector(".movieInput");
const searchButton = document.querySelector(".searchButton");
const currencyAndFlag = document.querySelector(".currencyAndFlag");
const movieTittle = document.querySelector(".movieTittle");
const yearsAgo = document.querySelector(".yearsAgo");
const actingField = document.querySelector(".actingField");
const currencyAndFlagDiv = document.querySelector(".currencyAndFlagDiv");
const mainDiv = document.querySelector(".mainDiv");

// this is creating a listener on click event and gets movie according our input value
searchButton.addEventListener("click", function () {
  return getData(movieInput.value);
});

// this function hadles specified movie data from using fetch
function getData(movieName) {
  fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=${APIKey}`)
    .then((data) => data.json())
    .then(displayResult);
}

// this function iterates data to html
function displayResult(movie) {
  const now = new Date();
  console.log(movie);
  // creates array of countries and gets specified country where the movie was made
  const countryArr = [];
  movie.Country.split(",").forEach((x) => countryArr.push(x.trim()));
  for (let i = 0; i < countryArr.length; i++) {
    fetch(`https://restcountries.com/v3.1/name/${countryArr[i]}?fullText=true`)
      .then((data) => data.json())
      .then(currencyAndFlags)
      .catch(error);

    currencyAndFlagDiv.innerHTML = "";
  }
  function error() {
    currencyAndFlagDiv.innerHTML += `Country: ${movie.Country}`;
  }
  // this function merges several information from countries API and inserts in HTML element
  function currencyAndFlags(x) {
    currencyAndFlagDiv.innerHTML +=
      `${x[0].name.common}: ${Object.keys(x[0].currencies)}<img src='${
        x[0].flags.svg
      }' width=20 height=20/>` || `Country: ${movie.Country}`;
  }

  // the code below filters fullnames and gets only first names of actors and actresses
  let nameArr = [];
  movie.Actors.split(",").forEach((x) => {
    let newArr = x.trim().substring(0, x.trim().indexOf(" "));
    nameArr.push(newArr);
  });
  const joinedNames = nameArr.join(", ");

  // iteration in HTML
  mainDiv.style.cssText = `background: url(${movie.Poster} );background-repeat: no-repeat; background-size:100%`;
  movieTittle.innerHTML = `Title: ${movie.Title}`;
  yearsAgo.innerHTML = `Released: ${
    now.getFullYear() - movie.Year.slice(-4)
  } years ago`;
  actingField.innerHTML = `Actors: ${joinedNames}`;
}

// assignment 2
const resultSummerButton = document.querySelector(".inputSummer");
const firstInput = document.querySelector(".firstInput");
const secondInput = document.querySelector(".secondInput");
const thirdInput = document.querySelector(".thirdInput");
const getRuntime = document.querySelector(".getRuntime");
const getPopulation = document.querySelector(".getPopulation");

// adds click event on button for all input and redefines empty array
resultSummerButton.addEventListener("click", function () {
  getResult(firstInput.value, secondInput.value, thirdInput.value);
  popArr = [];
  newArr2 = [];
});

// this function makes loop in fetch and takes data from each movie
function getResult(first, second, third) {
  const newArr = [];
  newArr.push(first, second, third);
  newArr.forEach((inputNames) => {
    fetch(`http://www.omdbapi.com/?t=${inputNames}&apikey=${APIKey}`)
      .then((data) => data.json())
      .then(displaySumResult);
  });
}

let newArr2 = [];
// this function sums length of all movies
function displaySumResult(name) {
  const runtime = +name.Runtime.split(" ")[0];
  newArr2.push(runtime);
  const newArr3 = newArr2.reduce((a, b) => a + b, 0);
  getRuntime.innerHTML = `Length: ${newArr3} minutes`;
  console.log(newArr3);

  // this function takes all country data from API within forEach loop
  const populationArr = [];
  name.Country.split(",").forEach((x) => populationArr.push(x.trim()));
  populationArr.forEach((populationn) => {
    fetch(`https://restcountries.com/v3.1/name/${populationn}?fullText=true`)
      .then((data) => data.json())
      .then(getPopulations).catch(popError);
  });
}
function popError() {
  getPopulation.innerHTML = `Old Country`;
}
// gets movie data and adds last iteration to HTML
let popArr = [];
function getPopulations(countryName) {
  popArr.push(countryName[0].population);
  const newPopArr = popArr.reduce((a, b) => a + b, 0);
  getPopulation.innerHTML = `Population: ${newPopArr}`;
}



// promise pollyfill
const p1 = Promise.resolve(3);
const p2 = 1000;
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hey');
  }, 2000);
});

function myPromise(...a) {
  const promiseResults = [];
  return new Promise((resolve,reject) => {
    a.forEach((value, index) => {
      Promise.resolve(value)
        .then((res) => {
          promiseResults[index] = res;
          if (promiseResults.length === a.length) {
            resolve(promiseResults);
          }
        })
        .catch((err) => reject(err));
    });
  });
}

console.log(myPromise(p1, p2, p3).then((value) => console.log(value)));