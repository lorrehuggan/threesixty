import React, { useState, useEffect } from 'react';
import { H1, Wrapper } from '../styles/GlobalComponents';
import { breakpoints } from '../styles/Mixins';
import FilmBanner from '../components/Banner/FilmBanner/FilmBanner';
import { useParams } from 'react-router-dom';
import Trailer from '../components/Trailer/Trailer';
import { baseURL, API_KEY } from '../utils/request';

function Film() {
  const { xl } = breakpoints;
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerURL, setTrailerURL] = useState('');
  const [trailerError, setTrailerError] = useState(false);

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
      <FilmBanner
        movie={movie}
        loading={loading}
        error={error}
        opacity="0.05"
        hOpacity="0.05"
        trailerURL={trailerURL}
        setTrailerURL={setTrailerURL}
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
    </Wrapper>
  );
}

export default Film;
