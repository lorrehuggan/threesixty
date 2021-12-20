import React, { useEffect, useState, useContext } from 'react';
import { MenuContext } from '../../../contexts/MenuContext';
import { useHistory } from 'react-router-dom';
import { breakpoints, styledTheme } from '../../../styles/Mixins';
import useFetch from '../../../hooks/useFetch';
import { FETCH_TRENDING, imgPath } from '../../../utils/request';
import { H1, Wrapper, Image, P, H5 } from '../../../styles/GlobalComponents';
import Trailer from '../../Trailer/Trailer';
// import movieTrailer from 'movie-trailer';
import {
  Poster,
  StyledWrapper,
  InnerWrapper,
  BottomGradient,
  StyledBigBody,
  ButtonWrapper,
} from './Banner.Styles';

function Banner({ opacity, hOpacity }) {
  const [url, setUrl] = useState(null);
  const { data: movies, loading, error } = useFetch(url);
  const { xl, lg } = breakpoints;
  const [bannerUrl, setBannerUrl] = useState(null);
  const history = useHistory();
  const [currentHero, setCurrentHero] = useState({ a: 2, b: 3 });
  const { openMenu, setOpenMenu } = useContext(MenuContext);
  const [isHovered, setIsHovered] = useState(false);
  const [trailerURL, setTrailerURL] = useState('');
  // const [trailerError, setTrailerError] = useState(false);

  useEffect(() => {
    setUrl(FETCH_TRENDING(1));
  }, []);

  useEffect(() => {
    setBannerUrl(
      movies?.slice(currentHero.a, currentHero.b).map((m) => {
        return m.id;
      })
    );
  }, [movies, currentHero]);

  const handleClick = () => {
    history.push(`/film/${bannerUrl}`);
  };

  const handleBannerDetails = () => {
    setOpenMenu(false);
    history.push(`/film/${bannerUrl}`);
  };

  // const handleMouseEnter = (movie) => {
  //   setTimeout(() => {
  //     movieTrailer(
  //       movie?.title || movie?.original_name || movie?.original_title || '',
  //       { id: true }
  //     )
  //       .then((url) => {
  //         setIsHovered(true);
  //         setTrailerURL(url);
  //       })
  //       .catch(() => {
  //         setTrailerError(true);
  //       });
  //   }, 4000);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  //   movieTrailer('', { id: false });
  // };

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
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
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
      lgWidth={lg}
      lgHeight="34"
      mdWidth="980"
      cursor
      // onMouseEnter={() => handleMouseEnter(movies[2])}
      // onMouseLeave={handleMouseLeave}
    >
      {error && <H1>Error</H1>}
      {movies &&
        movies?.slice(currentHero.a, currentHero.b).map((movie) => {
          return isHovered ? (
            <Trailer
              movie={movie}
              loading={loading}
              error={error}
              trailerURL={trailerURL}
              onClick={handleClick}
              height="544"
            />
          ) : (
            <Poster
              open={openMenu}
              opacity={opacity}
              hOpacity={hOpacity}
              src={imgPath + movie?.backdrop_path}
              onClick={() => handleClick}
            >
              {openMenu && <BottomGradient top />}
              <H1
                lgFontSize={styledTheme.heroHeadline}
                variants={textVar}
                initial="hidden"
                animate="visible"
              >
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
                <InnerWrapper
                  direction="column"
                  padding="0"
                  margin="2"
                  align="left"
                  pos="relative"
                >
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
                  >{`${movie.overview.substring(0, 170)}...`}</P>
                  <ButtonWrapper
                    variants={textVar}
                    initial="hidden"
                    animate="visible"
                    direction="row"
                    align="left"
                    justify="left"
                  >
                    {/* <StyledBigBody
                      lgWidth="30"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={() => handleClick(movie)}
                    >
                      {trailerURL ? 'Close' : 'Watch Trailer'}
                    </StyledBigBody> */}

                    <StyledBigBody
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={handleBannerDetails}
                    >
                      More
                    </StyledBigBody>
                  </ButtonWrapper>
                </InnerWrapper>
              </StyledWrapper>
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
              <BottomGradient bottom gradient />
            </Poster>
          );
        })}
    </Wrapper>
  );
}

export default Banner;
