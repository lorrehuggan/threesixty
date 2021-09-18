import React, { useEffect, useState } from 'react';
import { breakpoints } from '../../styles/Mixins';
import useFetch from '../../hooks/useFetch';
import { baseURL, imgPath, request } from '../../utils/request';
import { H1, Wrapper, Image, P, H5 } from '../../styles/GlobalComponents';
import {
  Poster,
  StyledWrapper,
  InnerWrapper,
  BottomGradient,
  StyledBigBody,
} from './Banner.Styles';

function Banner() {
  const [url, setUrl] = useState(null);
  const { data: movies, loading, error } = useFetch(url);
  const { xl } = breakpoints;

  useEffect(() => {
    setUrl(baseURL + request.fetchTrending);
  }, []);

  return (
    <Wrapper width={xl} height="40" radius="2">
      {error && <H1>Error</H1>}
      {movies &&
        movies?.slice(7, 8).map((movie) => {
          return (
            <Poster src={imgPath + movie?.backdrop_path}>
              <H1>
                {loading
                  ? 'Loading...'
                  : movie.title || movie.original_name || movie.original_title}
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
                  <H5 bottom="1">{movie.vote_average}</H5>
                  <P bottom="1">{`${movie.overview.substring(0, 170)}...`}</P>
                  <StyledBigBody>Watch Trailer</StyledBigBody>
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
              <BottomGradient />
            </Poster>
          );
        })}
    </Wrapper>
  );
}

export default Banner;
