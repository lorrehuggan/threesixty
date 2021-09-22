export const API_KEY = process.env.REACT_APP_API;

export const baseURL = 'https://api.themoviedb.org/';

export const imgPath = `https://image.tmdb.org/t/p/original/`;

export const FETCH_ID = (id) => {
  return baseURL + `3/movie/${id}?api_key=${API_KEY}&language=en-US`;
};

export const FETCH_RECOMMENDATIONS = (id) => {
  return (
    baseURL +
    `3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
  );
};

export const FETCH_CATEGORIES = (id, page) => {
  return (
    baseURL +
    `3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&page=${page}&with_genres=${id}`
  );
};

export const FETCH_TRENDING = (page) => {
  return baseURL + `3/trending/all/day?api_key=${API_KEY}&page=${page}`;
};

export const FETCH_QUERY = (page, query) => {
  return (
    baseURL +
    `3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`
  );
};

export const FETCH_GENRE = () => {
  return baseURL + `3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
};
