import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import styled from 'styled-components';
import { Wrapper } from '../styles/GlobalComponents';
import { baseURL, request, imgPath } from '../utils/request';
import { breakpoints } from '../styles/Mixins';
import Banner from '../components/Banner/Banner';

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
  const { xl } = breakpoints;

  useEffect(() => {
    setUrl(baseURL + request.fetchTrending);
  }, []);

  return (
    <Wrapper width={xl} align="center">
      <Banner />
    </Wrapper>
  );
}

export default Main;
