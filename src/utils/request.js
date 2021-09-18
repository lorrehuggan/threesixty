export const API_KEY = process.env.REACT_APP_API;

export const baseURL = 'https://api.themoviedb.org/';

export const imgPath = `https://image.tmdb.org/t/p/original/`;

export const request = {
  fetchTrending: `3/trending/all/day?api_key=${API_KEY}`,
  fetchAction: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=28`,
  fetchComedy: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=35`,
  fetchDocumentary: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=2&with_genres=99`,
  fetchSciFi: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=878`,
  fetchPopularPerson: `3/person/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchQuerySearch: `3/search/movie?api_key=${API_KEY}&page=1`,
  fetchTvPopular: `3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTvPopular2: `3/tv/popular?api_key=${API_KEY}&language=en-US&page=2`,
  fetchGenre: `3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
};

export const FETCH_ID = (id) => {
  return `3/movie/${id}?api_key=${API_KEY}&language=en-US`;
};
