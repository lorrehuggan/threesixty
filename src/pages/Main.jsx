import React, { useState, useEffect } from 'react';
import { Wrapper, H1 } from '../styles/GlobalComponents';
import { breakpoints } from '../styles/Mixins';
import Banner from '../components/Banner/HomeBanner/Banner';
import MovieRow from '../components/MovieRow/MovieRow';
import { useParams } from 'react-router-dom';
import Trailer from '../components/Trailer/Trailer';
import { baseURL, API_KEY, request } from '../utils/request';

function Main() {
  const { xl } = breakpoints;
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerURL, setTrailerURL] = useState('');
  const [trailerError, setTrailerError] = useState(false);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    fetch(baseURL + `3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch resource');
        }
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
        setError(null);
      })

      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setLoading(false);
          setError(err.message);
        }
      });
  }, [id, setLoading, setError]);

  return (
    <Wrapper width={xl} align="center">
      <Banner
        opacity="0.35"
        hOpacity="0.5"
        trailerURL={trailerURL}
        setTrailerURL={setTrailerURL}
        trailerError={trailerError}
        setTrailerError={setTrailerError}
      />
      {trailerURL && (
        <Trailer
          movie={movie}
          loading={loading}
          error={error}
          trailerURL={trailerURL}
        />
      )}
      {trailerError && <H1>Error</H1>}
      <MovieRow req={request.fetchTrending} title="Trending" />
      <MovieRow req={request.fetchSciFi} title="Sci-Fi" />
      <MovieRow req={request.fetchDocumentary} title="Documentary" />
      <MovieRow req={request.fetchTvPopular} title="Tv" />
    </Wrapper>
  );
}

export default Main;
