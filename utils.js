
export const API_KEY = "53e7e6dbe6b0499ecf012ec99c7cb58e";

export function getWatchlist() {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
}

export function saveWatchlist(arr) {
  localStorage.setItem("watchlist", JSON.stringify(arr));
}

export function escapeAttr(str = "") {
  return String(str).replaceAll('"', "&quot;");
}


export function normalizeMovie(movie) {
  return {
    id: String(movie.id),
    title: movie.title,
    rating: movie.vote_average ?? movie.rating ?? "",
    overview: movie.overview ?? "",
    posterPath: movie.poster_path ?? movie.poster ?? ""
  };
}

export function renderMovieCard(rawMovie, mode = "search") {
  const movie = normalizeMovie(rawMovie);

  const MAX = 240;
  const shortText =
    movie.overview && movie.overview.length > MAX
      ? movie.overview.slice(0, MAX) + "..."
      : movie.overview;

  const isLong = movie.overview && movie.overview.length > MAX;

  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w300${movie.posterPath}`
    : "";

  const buttonHtml =
    mode === "search"
      ? `<button class="add-to-list"
            data-id="${movie.id}"
            data-title="${escapeAttr(movie.title)}"
            data-poster="${movie.posterPath}"
            data-rating="${movie.rating}"
            data-overview="${escapeAttr(movie.overview)}">
            + Add to watchlist
         </button>`
      : `<button class="remove-from-list" data-id="${movie.id}">
            ❌ Remove
         </button>`;

  return `
    <div class="movie" data-id="${movie.id}">
      ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title}"/>` : ""}

      <div class="movie-info">
        <div class="movie-header">
          <p class="movie-title">${movie.title}</p>
          <p class="movie-rate">⭐ ${movie.rating}</p>
        </div>

        <div class="movie-descr">
          <p>
            ${shortText || ""}
            ${isLong ? `<span class="read-more" data-full="${escapeAttr(movie.overview)}"> Read more</span>` : ""}
          </p>
        </div>

        ${buttonHtml}
      </div>
    </div>
  `;
}
