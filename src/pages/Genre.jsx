import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseURL, FETCH_CATEGORIES } from '../utils/request';
import useFetch from '../hooks/useFetch';
import Card from '../components/Card/Card';
import { GridContainer } from '../components/MovieRow/MovieRow.styles';
import { breakpoints } from '../styles/Mixins';
import { H1, Wrapper } from '../styles/GlobalComponents';
import styled from 'styled-components';

export const Grid = styled.div`
  width: ${breakpoints.xl};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 0.5rem;
`;

function Genre() {
  const { xl } = breakpoints;
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(
    baseURL + FETCH_CATEGORIES(id, page)
  );
  const {
    data: category,
    loading: categoryLoading,
    error: categoryError,
  } = useFetch();

  console.log(data);

  return (
    <div>
      <Wrapper
        width={xl}
        style={{
          overflow: 'visible',
        }}
      >
        <H1>{id}</H1>
        <Grid>
          {data.map((d) => (
            <Link to={`/film/${d.id}`}>
              <Card poster={d.poster_path} />
            </Link>
          ))}
        </Grid>
      </Wrapper>
    </div>
  );
}

export default Genre;
