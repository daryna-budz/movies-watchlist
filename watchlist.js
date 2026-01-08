
import { getWatchlist, saveWatchlist, renderMovieCard } from "./utils.js";

const watchlistEl = document.querySelector(".watchlist");

function renderWatchlist() {
  const watchlist = getWatchlist();
  

  watchlistEl.innerHTML = watchlist
    .map(m => renderMovieCard(m, "watchlist"))
    .join("");
}

renderWatchlist();

document.addEventListener("click", e => {
  if (e.target.classList.contains("read-more")) {
    e.target.closest("p").innerText = e.target.dataset.full;
    return;
  }

  if (e.target.classList.contains("remove-from-list")) {
    const id = e.target.dataset.id;
    const updated = getWatchlist().filter(m => String(m.id) !== String(id));
    saveWatchlist(updated);

    e.target.closest(".movie").remove();
  }
});

