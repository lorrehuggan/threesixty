import React, { useState, useEffect } from 'react';
import { Wrapper } from '../styles/GlobalComponents';
import styled from 'styled-components';
import { Container, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { baseURL, request, imgPath } from '../utils/request';

export const Wrap = styled(Wrapper)`
  background-color: ${({ theme }) => theme.warning};
`;

function Main() {
  const [url, setUrl] = useState(null);
  const { data: movies, loading, error } = useFetch(url);

  useEffect(() => {
    setUrl(baseURL + request.fetchTrending);
  }, []);

  console.log(movies);

  return (
    <Wrap padding="6" width="100">
      <Typography color="primary" variant="h1">
        Hello
      </Typography>
      {!loading && (
        <div>
          {movies?.map((movie) => {
            return (
              <img
                height={200}
                src={imgPath + movie.poster_path}
                alt={movie.title}
              />
            );
          })}
        </div>
      )}
    </Wrap>
  );
}

export default Main;
