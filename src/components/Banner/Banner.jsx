import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../styles/Mixins';
import useFetch from '../../hooks/useFetch';
import { baseURL, imgPath, request } from '../../utils/request';
import {
  H1,
  Wrapper,
  Image,
  P,
  BigBody,
  SubHeader,
} from '../../styles/GlobalComponents';

export const Poster = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 2rem;
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    background-image: url(${({ src }) => src});
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
    z-index: -1;
  }
`;

export const StyledWrapper = styled(Wrapper)`
  width: 100%;
`;
export const InnerWrapper = styled(Wrapper)`
  width: 50%;
`;

export const StyledBigBody = styled(BigBody)`
  cursor: pointer;
  border: 1px solid primary;
  display: inline;
  padding: 0.5rem 0rem;
  width: 15.9%;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #80808020;
  }
  &:active {
    background-color: #80808070;
  }
`;

function Banner() {
  const [url, setUrl] = useState(null);
  const { data: movies, loading, error } = useFetch(url);
  const { xl, lg } = breakpoints;

  useEffect(() => {
    setUrl(baseURL + request.fetchTrending);
  }, []);

  console.log(movies);

  return (
    <Wrapper width={xl} height="40" radius="2">
      {movies &&
        movies?.slice(6, 7).map((movie) => {
          return (
            <Poster src={imgPath + movie?.backdrop_path}>
              <H1>{movie.title}</H1>
              <StyledWrapper
                justify="left"
                align="left"
                direction="row"
                pos="absolute"
                bottom="0"
                left="0"
              >
                <InnerWrapper direction="column" padding="0" margin="2">
                  <SubHeader bottom="1">{movie.vote_average}</SubHeader>
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
              />
            </Poster>
          );
        })}
    </Wrapper>
  );
}

export default Banner;
