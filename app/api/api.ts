const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
const token = process.env.NEXT_PUBLIC_MOVIE_TOKEN;
// export { apiUrl };
const fetchData = (url: string, cache: RequestCache) =>
  fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: cache,
  }).then((res) => res.json());

export const trindingMovies = async (page: number) => {
  const data = await fetchData(
    `https://api.themoviedb.org/3/discover/movie?with_genres=16&language=en-US&page=${page}`,
    "force-cache"
  );
  return data;
};

export const serchMovie = async (query: string) => {
  const data = await fetchData(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    "no-cache"
  );
  return data;
};

export const getMovieById = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
};
