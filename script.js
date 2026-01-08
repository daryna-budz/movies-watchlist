
import { API_KEY, getWatchlist, saveWatchlist, renderMovieCard } from "./utils.js";

const btn = document.getElementById("search-btn");
const searchInput = document.getElementById("movie-input");
const moviesListEl = document.querySelector(".movies");
const startTextEl = document.getElementById("start-text");

function fetchMovies(query) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        moviesListEl.innerHTML = `<p>No movies found.</p>`;
        return;
      }

      moviesListEl.innerHTML = data.results
        .filter(m => m.poster_path && m.overview)
        .map(m => renderMovieCard(m, "search"))
        .join("");
    })
    .catch(() => {
      if (startTextEl) {
        startTextEl.innerHTML = `<p>Unable to find what you’re looking for. Please try another search.</p>`;
      }
    });
}

btn.addEventListener("click", () => {
  const q = searchInput.value.trim();
  if (!q) return;
  fetchMovies(q);
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("read-more")) {
    e.target.closest("p").innerText = e.target.dataset.full;
    return;
  }

  if (e.target.classList.contains("add-to-list")) {
    const movie = {
      id: e.target.dataset.id,
      title: e.target.dataset.title,
      poster: e.target.dataset.poster,
      rating: e.target.dataset.rating,
      overview: e.target.dataset.overview
    };

    const watchlist = getWatchlist();

    if (!watchlist.some(m => String(m.id) === String(movie.id))) {
      watchlist.push(movie);
      saveWatchlist(watchlist);
      e.target.innerText = "Added";
      e.target.disabled = true;
    }
  }
});


