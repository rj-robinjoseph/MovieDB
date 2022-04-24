const API_KEY = "api_key=45ea19d787f462846ede1e9f7540b5a1";

const BASE_URL = "https://api.themoviedb.org/3";

const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API = BASE_URL + "/search/movie?" + API_KEY;

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const main = document.getElementById("main");
const form = document.getElementById("form");
const searchInput = document.getElementById("searchInput");
const tagsEl = document.getElementById("tags");
const overlayContent = document.getElementById("overlayContent");
const overlaySecondContent = document.getElementById("overlaySecondContent");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = "";
var totalPages = 100;

var selectedGenre = [];

setGenre();
function setGenre() {
  tagsEl.innerHTML = "";
  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      clear.classList.remove("disable");
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, index) => {
            if (id == genre.id) {
              selectedGenre.splice(index, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
      highlightSelection();
    });
    tagsEl.append(t);
  });
}
const clear = document.querySelector(".clearImg");
clear.addEventListener("click", () => {
  clear.classList.add("disable");
  selectedGenre = [];
  setGenre();
  getMovies(API_URL);
});

function highlightSelection() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });
  if (selectedGenre.length != 0) {
    selectedGenre.forEach((id) => {
      const highlightedtag = document.getElementById(id);
      highlightedtag.classList.add("highlight");
    });
  }
}

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length !== 0) {
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;

        current.innerText = currentPage;

        if (currentPage <= 1) {
          prev.classList.add("disabled");
          next.classList.remove("disabled");
        } else if (currentPage >= totalPages) {
          prev.classList.remove("disabled");
          next.classList.add("disabled");
        } else {
          prev.classList.remove("disabled");
          next.classList.remove("disabled");
        }

        window.scroll({ top: 0, left: 0, behavior: "smooth" });

        //
      } else {
        main.innerHTML = `<div class="emptyContainer">
        <h1 class="empty">No Results Found</h1>
        <img src="./img/search.png" alt="" class="emptyImg">
        </div>`;
      }
    });
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id, release_date } =
      movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("singleMovieSec");

    movieElement.innerHTML = ` 
    
    <img
      src="${
        poster_path
          ? IMG_PATH + poster_path
          : "https://thumbs.dreamstime.com/b/corrupted-file-document-outline-icon-corrupted-file-document-outline-icon-linear-style-sign-mobile-concept-web-design-bad-116231507.jpg"
      }"
      alt="${title}"
    />
    <div class="movieInfo">
      <h3 class="movieTitle">${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3 class="overviewTitle">Overview</h3>
      ${truncate(overview, 50) + "..."}
      <p class="releaseDate">Release Date: ${release_date}</p>
      <button class="knowMore" id="${id}">Know More</button>
    </div>
  
    `;
    main.appendChild(movieElement);

    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openNav(movie);
    });
  });
}

function truncate(str, no_words) {
  return str.split(" ").splice(0, no_words).join(" ");
}

/* Open */
function openNav(movie) {
  let id = movie.id;
  fetch(BASE_URL + "/movie/" + id + "?" + API_KEY)
    .then((res) => res.json())
    .then((movieData) => {
      const {
        title,
        poster_path,
        vote_average,
        overview,
        release_date,
        runtime,
      } = movieData;
      overlayContent.innerHTML = `
      <div class="overlayWrapper">
          <div class="overlayWrapperLeft">
            <div class="posterImg">
            <img
            src="${
              poster_path
                ? IMG_PATH + poster_path
                : "https://thumbs.dreamstime.com/b/corrupted-file-document-outline-icon-corrupted-file-document-outline-icon-linear-style-sign-mobile-concept-web-design-bad-116231507.jpg"
            }"
            alt="${title}"
          />
            </div>
          </div>
          <div class="overlayWrapperRight">
            <div class="overlayTitle">
              <h1>${title}</h1>
              <span class="${getClassByRate(
                vote_average
              )}">${vote_average}</span>
            </div>
            <div class="overlayOverview">
              <p>
               ${overview}
              </p>
            </div>
            <div class="overlayDetails">
              <span class="overlayReleaseDate">Release Date: ${release_date}</span>
              <span class="overlayRunTime">Run Time: ${runtime + "Mins"} </span>
            </div>
          </div>
        </div>
      `;
    });

  fetch(BASE_URL + "/movie/" + id + "/videos?" + API_KEY)
    .then((res) => res.json())
    .then((videoData) => {
      console.log(videoData.results);
      let iframeContainer = document.querySelector(".iframeVid");
      let maxClips =
        videoData.results.length > 3 ? 3 : videoData.results.length;

      for (let i = 0; i < maxClips; i++) {
        iframeContainer.innerHTML += `
          <iframe
              src="https://www.youtube.com/embed/${videoData.results[i].key}"
              title="${videoData.results[i].name}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          `;
      }
    });
  document.getElementById("myNav").style.width = "100%";
}

/* Close */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
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
  selectedGenre = [];
  setGenre();

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + "&query=" + searchTerm);

    searchInput.value = "";
  } else {
    window.location.reload();
  }
});

prev.addEventListener("click", () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});

next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  let queryParams = urlSplit[1].split("&");
  let key = queryParams[queryParams.length - 1].split("=");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    let url = urlSplit[0] + "?" + b;
    getMovies(url);
  }
}
