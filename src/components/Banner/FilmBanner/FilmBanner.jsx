import React, { useState } from 'react';
import { breakpoints } from '../../../styles/Mixins';
import { imgPath } from '../../../utils/request';
import { H1, Wrapper, Image, P, H5 } from '../../../styles/GlobalComponents';
import {
  Poster,
  StyledWrapper,
  InnerWrapper,
  BottomGradient,
  StyledBigBody,
} from '../HomeBanner/Banner.Styles';
import movieTrailer from 'movie-trailer';

function Banner({
  opacity,
  hOpacity,
  movie,
  loading,
  error,
  trailerURL,
  setTrailerURL,
  setTrailerError,
}) {
  const { xl } = breakpoints;

  //get youtube video id by passing movie title into movieTrailer func

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
          setTrailerURL(url);
        })
        .catch(() => setTrailerError(true));
    }
  };

  return (
    <Wrapper width={xl} height="38" radius="2" style={{ cursor: 'pointer' }}>
      {error && <H1>Oops Something Went Wrong...</H1>}
      {movie && (
        <Poster
          opacity={opacity}
          hOpacity={hOpacity}
          src={imgPath + movie?.backdrop_path}
          onClick={() => handleClick()}
        >
          <BottomGradient top />
          <H1>
            {loading
              ? 'Loading...'
              : `${movie.title.substring(0, 37)}...` ||
                `${movie.original_name.substring(0, 10)}...` ||
                `${movie.original_title.substring(0, 10)}...`}
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
              <H5 bottom="1">Rated {movie.vote_average}/10</H5>
              <P bottom="1">{movie.overview}</P>
              {!error && (
                <StyledBigBody
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={() => handleClick()}
                >
                  {trailerURL ? 'Stop' : 'Watch Trailer'}
                </StyledBigBody>
              )}
            </InnerWrapper>
          </StyledWrapper>
          {!error && (
            <Image
              pos="absolute"
              bottom="2"
              right="2"
              src={imgPath + movie.poster_path}
              width="10"
              shadow
            />
          )}
          <BottomGradient bottom gradient />
        </Poster>
      )}
    </Wrapper>
  );
}

export default Banner;
