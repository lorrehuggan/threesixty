import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, H1, Grid } from '../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../styles/Mixins';
import { SearchContext } from '../contexts/SearchContext';
import { Link } from 'react-router-dom';
import Card from '../components/Card/Card';
import { motion } from 'framer-motion';
import { QueryContext } from '../contexts/QueryContext';
import Pagination from '@mui/material/Pagination';

function Search({ page, setPage }) {
  const { xl, lg } = breakpoints;
  const { searchData: data } = useContext(SearchContext);
  const { queryData, setQueryData } = useContext(QueryContext);
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

  const gridVar = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  const handlePagination = (e, v) => {
    setPage(v);

    window.scroll(0, 0);
  };

  return (
    <Wrapper
      width={xl}
      style={{
        overflow: 'visible',
      }}
      lgWidth={lg}
    >
      <H1 style={{ marginBottom: '2rem' }} lgFontSize={styledTheme.headline}>
        Search Results
      </H1>
      <Grid count={movieAmount}>
        {data?.map((d, i) => (
          <motion.div
            variants={gridVar}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Link to={`/film/${d.id}`}>
              <Card grid poster={d.poster_path} title={d.title} />
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
        lgWidth={lg}
      >
        <Pagination
          onChange={handlePagination}
          count={queryData.total_pages}
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

export default Search;
