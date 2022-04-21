const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=45ea19d787f462846ede1e9f7540b5a1&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=45ea19d787f462846ede1e9f7540b5a1&query="';

const form = document.getElementById("form");
const searchInput = document.getElementById("searchInput");
const searchIcon = document.querySelector(".searchIcon");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.results);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    searchInput.value = "";
  } else {
    window.location.reload();
  }
});
