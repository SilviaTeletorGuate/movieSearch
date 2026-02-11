const API_KEY = "58d3fba38236457578d2c5eb8f45eb56";
const moviesEl = document.getElementById("movies");

const url =
    `https://api.themoviedb.org/3/discover/movie` +
    `?api_key=${API_KEY}` +
    `&language=es-ES` +
    `&with_genres=28` + // Action
    `&page=1` +
    `&sort_by=popularity.desc`;


async function loadMovies() {
    try {
        const res = await fetch(url);
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        console.log("🚀 ~ loadMovies ~ data:", data)

        
        const IMG = "https://image.tmdb.org/t/p/w342";

moviesEl.innerHTML = data.results
  .map((m) => `
    <li style="margin-bottom:12px;">
      <div><strong>${(m.title)}</strong></div>
      <div>${m.release_date || ""}</div>
      ${m.poster_path ? `<img src="${IMG}${m.poster_path}" alt="${(m.title)}" width="140">` : ""}
    </li>
  `)
  .join("");

    } catch (err) {
        console.error(err);
        moviesEl.innerHTML = `<li>Failed to load movies</li>`;
    }
}

loadMovies()