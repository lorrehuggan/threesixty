import React from 'react';
import { Wrapper } from '../styles/GlobalComponents';
import { breakpoints } from '../styles/Mixins';
import Banner from '../components/Banner/Banner';
import MovieRow from '../components/MovieRow/MovieRow';
import { request } from '../utils/request';

function Main() {
  const { xl } = breakpoints;

  return (
    <Wrapper width={xl} align="center">
      <Banner opacity="0.3" hOpacity="0.5" />
      <MovieRow req={request.fetchTrending} title="Trending" />
      <MovieRow req={request.fetchSciFi} title="Sci-Fi" />
      <MovieRow req={request.fetchDocumentary} title="Documentary" />
      <MovieRow req={request.fetchTvPopular} title="Tv" />
    </Wrapper>
  );
}

export default Main;
