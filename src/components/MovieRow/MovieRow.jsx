import React, { useEffect, useState } from 'react';
import { Image, Wrapper, H5, P } from '../../styles/GlobalComponents';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import { baseURL, imgPath } from '../../utils/request';
import { breakpoints, styledTheme } from '../../styles/Mixins';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.5rem;
  margin-top: 1rem;
`;

export const MovieCard = styled(motion.div)`
  position: relative;
  width: 17.5rem;
  height: 30rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.secondaryText};
  cursor: pointer;
  overflow: hidden;
  img {
    opacity: 0.9.3;
  }
`;

export const BottomGradient = styled.div`
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.textSecondary},
    transparent
  );
  width: 100%;
  height: 5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
`;

function MovieRow({ req, title }) {
  const [url, setUrl] = useState('');
  const { data: movies, loading, error } = useFetch(url);
  const { xl } = breakpoints;

  useEffect(() => {
    setUrl(baseURL + req);
  }, []);
  return (
    <Wrapper style={{ marginBottom: '1rem', marginTop: '1rem' }}>
      <Wrapper
        direction="row"
        justify="space-between"
        align="center"
        width={xl}
        style={{ marginBottom: '1rem' }}
      >
        <H5 color={styledTheme.warning} weight="300">
          {title}
        </H5>
        <P weight="700" cursor>
          More {title}
        </P>
      </Wrapper>
      <GridContainer>
        {movies &&
          movies?.slice(0, 5).map((movie) => {
            return (
              <Link to={`/film/${movie.id}`}>
                <MovieCard
                  whileHover={{
                    y: -16,
                    transition: { duration: 0.5, ease: 'easeOut' },
                  }}
                >
                  <Image
                    src={imgPath + movie.poster_path}
                    style={{ height: '100%', width: '100%' }}
                  />
                  <BottomGradient />
                </MovieCard>
              </Link>
            );
          })}
      </GridContainer>
    </Wrapper>
  );
}

export default MovieRow;
