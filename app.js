const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=45ea19d787f462846ede1e9f7540b5a1&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=45ea19d787f462846ede1e9f7540b5a1&query="';

const form = document.getElementById("form");
const searchInput = document.getElementById("searchInput");
const main = document.getElementById("main");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("singleMovieSec");

    movieElement.innerHTML = ` 
    
    <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
    <div class="movieInfo">
      <h3 class="movieTitle">${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3 class="overviewTitle">Overview</h3>
      ${overview}
    </div>
  
    `;
    main.appendChild(movieElement);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
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
