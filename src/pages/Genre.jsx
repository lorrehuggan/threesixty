import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FETCH_CATEGORIES, FETCH_GENRE } from '../utils/request';
import useFetch from '../hooks/useFetch';
import Card from '../components/Card/Card';
import { breakpoints, styledTheme } from '../styles/Mixins';
import { H1, BigBody, Wrapper, H4 } from '../styles/GlobalComponents';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { SkeletonCard } from '../components/Card/Card.styles';
import { motion } from 'framer-motion';

export const Grid = styled(motion.div)`
  width: ${breakpoints.xl};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 0.5rem;
`;

function Genre() {
  const { xl, md } = breakpoints;
  const { id } = useParams();
  const [numOfPages, setNumOfPages] = useState(10);
  const [page, setPage] = useState(1);
  const { data, loading, setLoading, error, results } = useFetch(
    FETCH_CATEGORIES(id, page)
  );
  const [genre, setGenre] = useState({});

  useEffect(() => {
    setNumOfPages(results?.total_pages);
    console.log(numOfPages);
  }, [results, numOfPages]);

  useEffect(() => {
    fetch(FETCH_GENRE())
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch resource');
        }
        return res.json();
      })
      .then((data) => {
        setGenre(
          data.genres?.filter((cat) => {
            return cat.id == id;
          })
        );
      })

      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log('error');
        }
      });
  }, [id]);

  const handlePagination = (e, v) => {
    setPage(v);
    window.scroll(0, 0);
  };
  const handleClick = () => {
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
    >
      <H1
        variants={headerVar}
        initial="hidden"
        animate="visible"
        transition={{
          duration: '0.7',
        }}
        style={{ marginBottom: '1rem' }}
      >
        {loading ? 'Loading...' : genre[0]?.name}
      </H1>
      <Grid>
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
            <Link onClick={handleClick} to={`/film/${d.id}`}>
              <Card grid poster={d.poster_path} />
            </Link>
          </motion.div>
        ))}
      </Grid>
      <Wrapper
        justify="center"
        align="center"
        width={xl}
        style={{
          marginBottom: '4rem',
          marginTop: '4rem',
          backgroundColor: styledTheme.textPrimary,
          padding: '1rem',
          borderRadius: '4px',
        }}
      >
        <Pagination
          onChange={handlePagination}
          count={numOfPages}
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

export default Genre;
