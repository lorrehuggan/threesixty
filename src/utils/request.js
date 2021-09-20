export const API_KEY = process.env.REACT_APP_API;

export const baseURL = 'https://api.themoviedb.org/';

export const imgPath = `https://image.tmdb.org/t/p/original/`;

export const request = {
  //......
  fetchAction: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=28`,
  fetchAdventure: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=12`,
  fetchAnimation: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=16`,
  fetchComedy: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=35`,
  fetchCrime: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=80`,
  fetchDrama: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=99`,
  fetchDocumentary: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=2&with_genres=99`,
  fetchFamily: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=10751`,
  fetchFantasy: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=14`,
  fetchHistory: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=36`,
  fetchHorror: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=27`,
  fetchMusic: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=10402`,
  fetchMystery: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=9648`,
  fetchRomance: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=10749`,
  fetchSciFi: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=878`,
  fetchTVMovie: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=10770`,
  fetchThriller: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=53`,
  fetchWar: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=10752`,
  fetchWestern: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=37`,
  //......
  fetchCategory: `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=1&with_genres=`,
  fetchTrending: `3/trending/all/day?api_key=${API_KEY}`,
  fetchPopularPerson: `3/person/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchQuerySearch: `3/search/movie?api_key=${API_KEY}&page=1`,
  fetchTvPopular: `3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTvPopular2: `3/tv/popular?api_key=${API_KEY}&language=en-US&page=2`,
  fetchGenre: `3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
};

export const FETCH_ID = (id) => {
  return `3/movie/${id}?api_key=${API_KEY}&language=en-US`;
};

export const FETCH_RECOMMENDATIONS = (id) => {
  return `3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;
};

export const FETCH_CATEGORIES = (id, page) => {
  return `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=${page}&with_genres=${id}`;
};

export const FETCH_TRENDING = (page) => {
  return `3/trending/all/day?api_key=${API_KEY}&page=${page}`;
};

export const FETCH_QUERY = (page, query) => {
  return `3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`;
};
