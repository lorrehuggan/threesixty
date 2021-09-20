import React, { useEffect, useState } from 'react';
import { breakpoints } from '../../../styles/Mixins';
import useFetch from '../../../hooks/useFetch';
import { baseURL, imgPath, request } from '../../../utils/request';
import { H1, Wrapper, Image, P, H5 } from '../../../styles/GlobalComponents';
import movieTrailer from 'movie-trailer';
import {
  Poster,
  StyledWrapper,
  InnerWrapper,
  BottomGradient,
  StyledBigBody,
} from './Banner.Styles';

function Banner({
  opacity,
  hOpacity,
  setTrailerURL,
  trailerURL,
  setTrailerError,
}) {
  const [url, setUrl] = useState(null);
  const { data: movies, loading, error } = useFetch(url);
  const { xl } = breakpoints;

  useEffect(() => {
    setUrl(baseURL + request.fetchTrending);
  }, []);

  const handleClick = (movie) => {
    setTrailerError(false);
    if (trailerURL) {
      setTrailerURL('');
    } else {
      movieTrailer(
        movie?.title || movie?.original_name || movie?.original_title || '',
        { id: true }
      )
        .then((url) => {
          setTrailerURL(url);
        })
        .catch(() => setTrailerError(true));
    }
  };

  return (
    <Wrapper width={xl} height="38" radius="2" style={{ cursor: 'pointer' }}>
      {error && <H1>Error</H1>}
      {movies &&
        movies?.slice(11, 12).map((movie) => {
          return (
            <Poster
              opacity={opacity}
              hOpacity={hOpacity}
              src={imgPath + movie?.backdrop_path}
              onClick={() => handleClick(movie)}
            >
              <H1>
                {loading
                  ? 'Loading...'
                  : movie.title?.substring(0, 35) ||
                    movie.original_name?.substring(0, 35) ||
                    movie.original_title?.substring(0, 35)}
              </H1>
              <StyledWrapper
                justify="left"
                align="left"
                direction="row"
                pos="absolute"
                bottom="0"
                left="0"
              >
                <InnerWrapper direction="column" padding="0" margin="2">
                  <H5 bottom="1">Rated {movie.vote_average * 10}%</H5>
                  <P bottom="1">{`${movie.overview.substring(0, 170)}...`}</P>
                  <StyledBigBody
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onClick={() => handleClick(movie)}
                  >
                    {trailerURL ? 'Close' : 'Watch Trailer'}
                  </StyledBigBody>
                </InnerWrapper>
              </StyledWrapper>
              <Image
                pos="absolute"
                bottom="2"
                right="2"
                src={imgPath + movie.poster_path}
                width="10"
                shadow
              />
              <BottomGradient bottom gradient />
            </Poster>
          );
        })}
    </Wrapper>
  );
}

export default Banner;
