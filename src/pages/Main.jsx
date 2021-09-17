import React, { useState, useEffect } from 'react';
import { Wrapper } from '../styles/GlobalComponents';
import styled from 'styled-components';
import { Container, Typography, IconButton } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { baseURL, request, imgPath } from '../utils/request';

export const Wrap = styled(Wrapper)`
  background-color: ${({ theme }) => theme.textSecondary};
`;

export const MovieCard = styled.div`
  height: ${({ size }) => `calc(${size}rem * 4)`};
  width: 450px;
  border-radius: 0.5rem;
  margin: 1rem 0.25rem;
  overflow: hidden;
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

function Main() {
  const [url, setUrl] = useState(null);
  const { data: movies, loading, error } = useFetch(url);

  useEffect(() => {
    setUrl(baseURL + request.fetchTrending);
  }, []);

  console.log(movies);

  return <Wrap height="100" width="100" justify="left"></Wrap>;
}

export default Main;
