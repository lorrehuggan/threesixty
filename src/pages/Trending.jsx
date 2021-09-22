import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FETCH_TRENDING } from '../utils/request';
import useFetch from '../hooks/useFetch';
import Card from '../components/Card/Card';
import { breakpoints, styledTheme } from '../styles/Mixins';
import { H1, Wrapper } from '../styles/GlobalComponents';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { SkeletonCard } from '../components/Card/Card.styles';

export const Grid = styled.div`
  width: ${breakpoints.xl};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 0.5rem;
`;

function Trending() {
  const { xl, md } = breakpoints;
  const [numOfPages, setNumOfPages] = useState(10);
  const [page, setPage] = useState(1);
  const { data, loading, error, results } = useFetch(FETCH_TRENDING(page));

  useEffect(() => {
    setNumOfPages(results?.total_pages);
    console.log(numOfPages);
  }, [results, numOfPages]);

  const handlePagination = (e, v) => {
    setPage(v);
    window.scroll(0, 0);
  };

  let skeletonArray = new Array(20).fill('i');

  return (
    <Wrapper
      width={xl}
      style={{
        overflow: 'visible',
      }}
    >
      <H1 style={{ marginBottom: '2rem' }}>Trending</H1>
      <Grid>
        {loading &&
          skeletonArray.map(() => {
            return <SkeletonCard />;
          })}
        {data.map((d) => (
          <Link onClick={handlePagination} to={`/film/${d.id}`}>
            <Card grid poster={d.poster_path} />
          </Link>
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
