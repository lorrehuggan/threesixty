import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FETCH_CATEGORIES, FETCH_GENRE } from '../utils/request';
import useFetch from '../hooks/useFetch';
import { MenuContext } from '../contexts/MenuContext';
import Card from '../components/Card/Card';
import { breakpoints, styledTheme, media } from '../styles/Mixins';
import { H1, Wrapper } from '../styles/GlobalComponents';
import styled from 'styled-components';
import Pagination from '@mui/material/Pagination';
import { SkeletonCard } from '../components/Card/Card.styles';
import { motion } from 'framer-motion';

export const Grid = styled(motion.div)`
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

function Genre() {
  const { xl, md, lg } = breakpoints;
  const { id } = useParams();
  const [numOfPages, setNumOfPages] = useState(10);
  const [page, setPage] = useState(1);
  const { data, loading, error, results } = useFetch(
    FETCH_CATEGORIES(id, page)
  );
  const [genre, setGenre] = useState({});
  const [width, setWidth] = useState('');
  const [movieAmount, setMovieAmount] = useState(4);
  const [pageLoading, setPageLoading] = useState(false);
  const { menuLoading } = useContext(MenuContext);

  useEffect(() => {
    if (window.innerWidth <= xl) {
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
            return cat.id.toString() === id;
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
    setPageLoading(true);
    setTimeout(() => {
      setPageLoading(false);
    }, 500);

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
      lgWidth={lg}
      mdWidth="980"
    >
      {error ? (
        <H1
          variants={headerVar}
          initial="hidden"
          animate="visible"
          transition={{
            duration: '0.7',
          }}
          style={{ marginBottom: '1rem' }}
          lgFontSize={styledTheme.headline}
        >
          Error
        </H1>
      ) : (
        <H1
          variants={headerVar}
          initial="hidden"
          animate="visible"
          transition={{
            duration: '0.7',
          }}
          style={{ marginBottom: '1rem' }}
          lgFontSize={styledTheme.headline}
        >
          {loading || pageLoading || menuLoading
            ? 'Loading...'
            : genre[0]?.name}
        </H1>
      )}
      {pageLoading || menuLoading ? (
        ''
      ) : (
        <Grid count={movieAmount}>
          {loading &&
            skeletonArray.map((arr, idx) => {
              return <SkeletonCard key={idx} />;
            })}

          {data.map((d, idx) => (
            <motion.div
              key={idx}
              variants={gridVar}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <Link onClick={handleClick} to={`/film/${d.id}`}>
                <Card grid poster={d.poster_path} />
              </Link>
            </motion.div>
          ))}
        </Grid>
      )}
      {!pageLoading ? (
        <Wrapper
          justify="center"
          align="center"
          width={md}
          style={{
            marginBottom: '4rem',
            marginTop: '4rem',
            backgroundColor: styledTheme.textPrimary,
            padding: '1rem',
            borderRadius: '4px',
          }}
          lgWidth={lg}
          mdWidth="980"
        >
          {!menuLoading ? (
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
          ) : (
            ''
          )}
        </Wrapper>
      ) : (
        ''
      )}
    </Wrapper>
  );
}

export default Genre;
