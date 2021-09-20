import React, { useContext, useEffect, useState } from 'react';
import { Wrapper, H1, Grid } from '../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../styles/Mixins';
import { SearchContext } from '../contexts/SearchContext';
import { Link } from 'react-router-dom';
import Card from '../components/Card/Card';

function Search() {
  const { xl, md } = breakpoints;
  const { searchData: data, setSearchData } = useContext(SearchContext);

  return (
    <Wrapper
      width={xl}
      style={{
        overflow: 'visible',
      }}
    >
      <H1 style={{ marginBottom: '2rem' }}>Search</H1>
      <Grid>
        {data?.map((d) => (
          <Link to={`/film/${d.id}`}>
            <Card grid poster={d.poster_path} title={d.title} />
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
        {/* <Pagination
          onChange={handlePagination}
          count={5}
          variant="outlined"
          shape="rounded"
          color="warning"
          size="large"
          page={page}
          siblingCount={2}
          boundaryCount={2}
        /> */}
      </Wrapper>
    </Wrapper>
  );
}

export default Search;
