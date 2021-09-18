import React from 'react';
import { Wrapper } from '../styles/GlobalComponents';
import { breakpoints } from '../styles/Mixins';
import Banner from '../components/Banner/Banner';

function Main() {
  const { xl } = breakpoints;

  return (
    <Wrapper width={xl} align="center">
      <Banner />
    </Wrapper>
  );
}

export default Main;
