import React, { useState, useEffect } from 'react';
import { H4, H5, P, Wrapper } from '../styles/GlobalComponents';
import { breakpoints } from '../styles/Mixins';
import FilmBanner from '../components/Banner/FilmBanner/FilmBanner';
import { useParams } from 'react-router-dom';
import Trailer from '../components/Trailer/Trailer';
import { baseURL, FETCH_ID, FETCH_RECOMMENDATIONS } from '../utils/request';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import movieTrailer from 'movie-trailer';
import { Link } from 'react-router-dom';
import Card from '../components/Card/Card';
import { GridContainer } from '../components/MovieRow/MovieRow.styles';

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
  const [recommendation, setRecommendation] = useState(null);
  const [recLoading, setRecLoading] = useState(true);
  const [recError, setRecError] = useState(null);

  useEffect(() => {
    fetch(baseURL + FETCH_ID(id))
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

  useEffect(() => {
    fetch(baseURL + FETCH_RECOMMENDATIONS(id))
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch resource');
        }
        return res.json();
      })
      .then((data) => {
        setRecommendation(data.results);
        setRecLoading(false);
        setRecError(null);
      })

      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setRecLoading(false);
          setRecError(err.message);
        }
      });
    return () => {};
  }, [id, setRecLoading, setRecError]);

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

  const cardClick = () => {
    if (trailerURL) {
      setTrailerURL('');
    } else {
      return;
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
      <Wrapper style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        <Wrapper
          direction="row"
          justify="space-between"
          align="center"
          width={xl}
          style={{ marginBottom: '2rem', marginTop: '1rem' }}
        >
          <H4>Recommended</H4>
        </Wrapper>
        <GridContainer direction="row">
          {recommendation &&
            recommendation?.slice(0, 4).map((rec) => {
              return (
                <Link
                  onClick={() => {
                    cardClick();
                  }}
                  to={`/film/${rec.id}`}
                >
                  <Card
                    poster={rec.poster_path}
                    title={rec.title}
                    loading={recLoading}
                  />
                </Link>
              );
            })}
        </GridContainer>
      </Wrapper>
    </Wrapper>
  );
}

export default Film;
