import React, { useState, useEffect } from 'react';
import { H5, P, Wrapper } from '../styles/GlobalComponents';
import { breakpoints } from '../styles/Mixins';
import FilmBanner from '../components/Banner/FilmBanner/FilmBanner';
import { useParams } from 'react-router-dom';
import Trailer from '../components/Trailer/Trailer';
import { baseURL, API_KEY } from '../utils/request';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import movieTrailer from 'movie-trailer';

export const Play = styled(FaPlay)`
  color: #ffffff;
  width: 8rem;
  height: 8rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(0.9);
  }
  &:active {
    color: grey;
  }
`;

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

  const handleClick = () => {
    setTrailerError(false);
    if (trailerURL) {
      setTrailerURL('');
    } else {
      movieTrailer(
        movie.title || movie.original_name || movie.original_title || '',
        { id: true }
      )
        .then((url) => {
          if (url === null) {
            setTrailerError(true);
          } else {
            setTrailerURL(url);
          }
        })
        .catch(() => setTrailerError(true));
    }
  };

  return (
    <Wrapper width={xl} align="center">
      <FilmBanner
        movie={movie}
        loading={loading}
        error={error}
        opacity="0.05"
        hOpacity="0.09"
        trailerURL={trailerURL}
        setTrailerURL={setTrailerURL}
        setTrailerError={setTrailerError}
      />
      {!trailerURL && (
        <Wrapper
          width={xl}
          height="30.625"
          style={{
            backgroundColor: 'black',
            marginTop: '2rem',
          }}
          justify="center"
          align="center"
          pos="relative"
        >
          {trailerError ? (
            <H5>Sorry we cant find what your looking for</H5>
          ) : (
            <Play onClick={() => handleClick()} />
          )}
          <P
            style={{
              position: 'absolute',
              top: '1rem',
              left: '2rem',
            }}
          >
            ThreeSixtyTrailers
          </P>
        </Wrapper>
      )}
      {trailerURL && (
        <Trailer
          movie={movie}
          loading={loading}
          error={error}
          trailerURL={trailerURL}
        />
      )}
    </Wrapper>
  );
}

export default Film;
