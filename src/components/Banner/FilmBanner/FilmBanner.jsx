import React from 'react';
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

  const handleTitle = () => {
    if (movie.title?.length > 34) {
      return (
        `${movie.title?.substring(0, 34)}...` || `${movie.original_title}...`
      );
    } else {
      return `${movie.title}` || `${movie.original_title}`;
    }
  };

  // Animations

  const wrapperVar = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
    hidden: { opacity: 0, y: 10 },
  };

  const textVar = {
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.2 } },
    hidden: { opacity: 0, y: 10 },
  };

  const posterVar = {
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.8 } },
    hidden: { opacity: 0, y: 10 },
  };

  return (
    <Wrapper
      variants={wrapperVar}
      initial="hidden"
      animate="visible"
      width={xl}
      height="38"
      radius="2"
      style={{ cursor: 'pointer' }}
    >
      {error && <H1>Oops Something Went Wrong...</H1>}
      {movie && (
        <Poster
          opacity={opacity}
          hOpacity={hOpacity}
          src={imgPath + movie?.backdrop_path}
          onClick={() => handleClick()}
        >
          <BottomGradient top />

          <H1 variants={textVar} initial="hidden" animate="visible">
            {loading ? 'Loading...' : handleTitle()}
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
              <H5
                variants={textVar}
                initial="hidden"
                animate="visible"
                bottom="1"
              >
                Rated {movie.vote_average * 10}%
              </H5>
              <P
                variants={textVar}
                initial="hidden"
                animate="visible"
                bottom="1"
              >{`${movie.overview?.substring(0, 480)}...`}</P>
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
              variants={posterVar}
              initial="hidden"
              animate="visible"
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
