import React from 'react';
import { Wrapper, H5, BigBody, Image } from '../../styles/GlobalComponents';
import { breakpoints } from '../../styles/Mixins';

function Nav() {
  const { xl, lg } = breakpoints;
  return (
    <Wrapper
      width={xl}
      justify="space-around"
      align="center"
      height="10"
      direction="row"
    >
      <Wrapper margin="0">
        <H5 font="header">ThreeSixty</H5>
      </Wrapper>
      <Wrapper direction="row" justify="space-between" width="250">
        <BigBody uppercase weight="700" cursor hover>
          Home
        </BigBody>
        <BigBody uppercase weight="700" cursor hover>
          Tv Show
        </BigBody>
        <BigBody uppercase weight="700" cursor hover>
          Movies
        </BigBody>
      </Wrapper>
      <Wrapper margin="0" direction="row" align="center">
        <BigBody right="0.5" uppercase weight="700">
          Profile
        </BigBody>
        <Image
          src="https://images.pexels.com/photos/5679150/pexels-photo-5679150.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          height="4"
          width="4"
        />
      </Wrapper>
    </Wrapper>
  );
}

export default Nav;
