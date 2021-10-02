import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FETCH_TRENDING } from '../utils/request';
import useFetch from '../hooks/useFetch';
import Card from '../components/Card/Card';
import { breakpoints, styledTheme, media } from '../styles/Mixins';
import { H1, Wrapper } from '../styles/GlobalComponents';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { SkeletonCard } from '../components/Card/Card.styles';
import { motion } from 'framer-motion';

export const Grid = styled.div`
  width: ${breakpoints.xl};
  display: grid;

  grid-template-columns: repeat(${({ count }) => count}, 1fr);

  grid-template-rows: auto;
  grid-gap: 0.5rem;
  ${media.large} {
    width: ${({ lgWidth }) => (lgWidth ? `${lgWidth}px` : '')};
    height: ${({ lgHeight }) => (lgHeight ? `${lgHeight}rem` : '')};
  }
`;

function Trending() {
  const { xl, md, lg } = breakpoints;
  const [numOfPages, setNumOfPages] = useState(10);
  const [page, setPage] = useState(1);
  const { data, loading, error, results } = useFetch(FETCH_TRENDING(page));
  const [genre, setGenre] = useState({});
  const [width, setWidth] = useState('');
  const [movieAmount, setMovieAmount] = useState(4);

  useEffect(() => {
    if (window.innerWidth < xl) {
      setMovieAmount(5);
    } else {
      setMovieAmount(4);
    }
  }, [width, xl]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
  });

  useEffect(() => {
    setNumOfPages(results?.total_pages);
    console.log(numOfPages);
  }, [results, numOfPages]);

  const handlePagination = (e, v) => {
    setPage(v);
    window.scroll(0, 0);
  };

  let skeletonArray = new Array(20).fill('i');

  // Animation

  const gridVar = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  const headerVar = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <Wrapper
      width={xl}
      style={{
        overflow: 'visible',
      }}
      lgWidth={lg}
    >
      <H1
        variants={headerVar}
        initial="hidden"
        animate="visible"
        transition={{
          duration: '0.7',
        }}
        style={{ marginBottom: '2rem' }}
        lgFontSize={styledTheme.headline}
      >
        {error ? 'Error' : 'Trending'}
      </H1>
      <Grid count={movieAmount}>
        {loading &&
          skeletonArray.map(() => {
            return <SkeletonCard />;
          })}
        {data.map((d, i) => (
          <motion.div
            variants={gridVar}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Link onClick={handlePagination} to={`/film/${d.id}`}>
              <Card grid poster={d.poster_path} />
            </Link>
          </motion.div>
        ))}
      </Grid>
      <Wrapper
        justify="center"
        align="center"
        width={md}
        style={{
          marginBottom: '4rem',
          marginTop: '4rem',
          backgroundColor: styledTheme.textPrimary,
          padding: '2rem',
          borderRadius: '8px',
        }}
        lgWidth={lg}
      >
        <Pagination
          onChange={handlePagination}
          count={5}
          variant="outlined"
          shape="rounded"
          color="warning"
          size="large"
          page={page}
          siblingCount={2}
          boundaryCount={2}
        />
      </Wrapper>
    </Wrapper>
  );
}

export default Trending;
