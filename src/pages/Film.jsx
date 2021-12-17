import React, { useState, useEffect } from 'react';
import { H4, H5, P, Wrapper } from '../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../styles/Mixins';
import FilmBanner from '../components/Banner/FilmBanner/FilmBanner';
import { useParams } from 'react-router-dom';
import Trailer from '../components/Trailer/Trailer';
import { FETCH_GENRE, FETCH_ID, FETCH_RECOMMENDATIONS } from '../utils/request';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import movieTrailer from 'movie-trailer';
import { Link } from 'react-router-dom';
import Card from '../components/Card/Card';
import { GridContainer } from '../components/MovieRow/MovieRow.styles';
import { GiFilmProjector } from 'react-icons/gi';
import useUser from '../hooks/useUser';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

//styled components
export const Play = styled(FaPlay)`
  color: ${({ theme }) => theme.textPrimary};
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

export const FilmIcon = styled(GiFilmProjector)`
  color: ${({ theme, play }) => (play ? theme.success : theme.textPrimary)};
  font-size: 2rem;
  margin-right: 0.5rem;
  transition: color 1.3s ease;
`;

export const GenreContainer = styled.div`
  display: flex;
  flex-direction: 'row';
  margin-left: 0.5rem;
`;

function Film() {
  const { xl, lg } = breakpoints;
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerURL, setTrailerURL] = useState('');
  const [trailerError, setTrailerError] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [recLoading, setRecLoading] = useState(true);
  const [recError, setRecError] = useState(null);
  const [genre, setGenre] = useState(null);
  const [genreLoading, setGenreLoading] = useState({});
  const [genreError, setGenreError] = useState({});
  const [width, setWidth] = useState('');
  const [movieAmount, setMovieAmount] = useState({ a: 0, b: 4 });
  const [userLikedFilms, setUserLikedFilm] = useState();
  const [like, setLike] = useState(false);
  const { userData } = useUser();

  //get user doc from firebase firestore

  useEffect(() => {
    setUserLikedFilm(userData.likes);
  }, [userData]);

  //check if current film is liked by user

  useEffect(() => {
    setLike(userLikedFilms?.includes(id));
  }, [id, userLikedFilms]);

  //set num of movies depending on screen size
  useEffect(() => {
    if (window.innerWidth < xl) {
      setMovieAmount({ a: 0, b: 5 });
    } else {
      setMovieAmount({ a: 0, b: 4 });
    }
  }, [width, xl]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  // Update likes

  const updateLikes = async (id, film) => {
    const userDoc = doc(db, 'users', id);
    function checkLikes(idx) {
      return idx === film;
    }
    if (userLikedFilms?.includes(film)) {
      const deleteLike = userLikedFilms.filter(checkLikes);
      const newLikeArr = { liked_film: [...deleteLike] };
      await updateDoc(userDoc, newLikeArr)
        .then(() => console.log('delete'))
        .catch((err) => console.log(err.message));
      return;
    }
    const addLike = { liked_film: [...userLikedFilms, film] };
    await updateDoc(userDoc, addLike)
      .then(() => {
        console.log('yeee');
      })
      .catch((err) => console.log(err.message));
  };

  const handleLike = () => {
    updateLikes(userData.id, id);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
  });

  // fetch genre for selected film
  useEffect(() => {
    fetch(FETCH_GENRE())
      .then((res) => {
        if (!res.ok) {
          throw Error('Could ot fetch resource');
        }
        return res.json();
      })
      .then((data) => {
        setGenre(data.genres);
        setGenreLoading(false);
        setGenreError(null);
      })

      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setLoading(false);
          setError(err.message);
        }
      });
  }, []);

  // fetch selected movie using movie ID

  useEffect(() => {
    fetch(FETCH_ID(id))
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

  // fetch recommended movies for selected film

  useEffect(() => {
    fetch(FETCH_RECOMMENDATIONS(id))
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

  // play youtube  video when clicked

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
            watchClick();
            setTrailerURL(url);
          }
        })
        .catch(() => setTrailerError(true));
    }
  };

  //play youtube video when banner is clicked

  const cardClick = () => {
    window.scroll(0, 0);
    if (trailerURL) {
      setTrailerURL('');
    } else {
      return;
    }
  };

  // scroll window to place youtube in the center of the viewport when clicked

  const watchClick = () => {
    if (!trailerURL) {
      window.scroll(0, 400);
    }
  };

  // skeleton animation

  const skeletonVar = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <Wrapper width={xl} align="center" lgWidth={lg} hidden mdWidth="980">
      <div onClick={handleLike}>{like ? 'like' : 'nope'}</div>
      <FilmBanner
        movie={movie}
        loading={loading}
        error={error}
        opacity="0.09"
        hOpacity="0.19"
        trailerURL={trailerURL}
        setTrailerURL={setTrailerURL}
        setTrailerError={setTrailerError}
        watchClick={watchClick}
      />
      <Wrapper
        variants={skeletonVar}
        initial="hidden"
        animate="visible"
        width={xl}
        style={{
          paddingLeft: '2rem',
          marginBottom: '1rem',
        }}
        direction="row"
        align="center"
        justifyContent="left"
        lgWidth="1024"
        mdWidth="980"
      >
        {movie.production_companies?.slice(0, 3).map((pc, idx) => (
          <P weight="700" right="0.25" key={idx}>
            {pc.name},
          </P>
        ))}
      </Wrapper>
      <Wrapper
        variants={skeletonVar}
        initial="hidden"
        animate="visible"
        width={xl}
        style={{ paddingLeft: '2rem', marginBottom: '1rem' }}
        direction="row"
        align="center"
        justifyContent="left"
        lgWidth="1024"
        mdWidth="980"
      >
        {movie.genres?.map((mg, idx) => (
          <Link onClick={cardClick} to={`/genre/${mg.id}`} key={idx}>
            <P
              weight="700"
              padding="0.25"
              uppercase
              hover
              style={{
                marginRight: '0.5rem',
                border: '0.25px solid white',
                letterSpacing: '1.25px',
              }}
            >
              #{mg.name}
            </P>
          </Link>
        ))}
      </Wrapper>
      <Wrapper
        variants={skeletonVar}
        initial="hidden"
        animate="visible"
        width={xl}
        style={{ paddingLeft: '2rem' }}
        direction="row"
        align="center"
        justifyContent="left"
        lgWidth={lg}
        mdWidth="980"
      >
        <FilmIcon play={trailerURL} />
        <P
          style={{
            color: trailerURL ? styledTheme.success : '',
            transition: 'color 1.3s ease',
          }}
          weight="700"
        >
          {trailerURL && 'Now Playing'}{' '}
          {movie.title || movie.original_name || movie.original_title || ''}{' '}
          Trailer
        </P>
      </Wrapper>

      {!trailerURL && (
        <Wrapper
          variants={skeletonVar}
          initial="hidden"
          animate="visible"
          width={xl}
          height="30.625"
          style={{
            backgroundColor: 'black',
            marginTop: '2rem',
          }}
          justify="center"
          align="center"
          pos="relative"
          lgWidth={lg}
          mdWidth="980"
          mdHeight="30"
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
        {recommendation && (
          <Wrapper
            hidden
            direction="row"
            justify="space-between"
            align="center"
            width={xl}
            lgWidth={lg}
            mdWidth="980"
            style={{ marginBottom: '2rem', marginTop: '1rem' }}
          >
            {recError ? <H4>Error</H4> : <H4>Recommended</H4>}
          </Wrapper>
        )}

        <GridContainer direction="row">
          {recommendation &&
            recommendation
              ?.slice(movieAmount.a, movieAmount.b)
              .map((rec, idx) => {
                return (
                  <Link
                    onClick={() => {
                      cardClick();
                    }}
                    to={`/film/${rec.id}`}
                    key={idx}
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
