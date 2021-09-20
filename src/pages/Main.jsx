import React, { useState, useEffect } from 'react';
import { Wrapper, H1 } from '../styles/GlobalComponents';
import { breakpoints } from '../styles/Mixins';
import Banner from '../components/Banner/HomeBanner/Banner';
import MovieRow from '../components/MovieRow/MovieRow';
import { useParams } from 'react-router-dom';
import Trailer from '../components/Trailer/Trailer';
import { baseURL, request, FETCH_ID } from '../utils/request';
import useFetch from '../hooks/useFetch';

function Main() {
  const { xl } = breakpoints;
  const { id } = useParams();
  const [trailerURL, setTrailerURL] = useState('');
  const [trailerError, setTrailerError] = useState(false);
  const [genre, setGenre] = useState(null);
  const { data: movie, loading, error } = useFetch(baseURL + FETCH_ID(id));

  useEffect(() => {
    fetch(baseURL + request.fetchGenre)
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch resource');
        }
        return res.json();
      })
      .then((data) => {
        setGenre(data.genres);
      })

      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log('error');
        }
      });
  }, []);

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
      {genre &&
        genre?.map((g) => {
          return (
            <MovieRow
              req={request.fetchCategory + g.id}
              title={g.name}
              id={g.id}
            />
          );
        })}
    </Wrapper>
  );
}

export default Main;
