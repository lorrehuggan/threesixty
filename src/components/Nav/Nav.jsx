import React from 'react';
import { Wrapper, H5, BigBody, Image } from '../../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../../styles/Mixins';
import { Link } from 'react-router-dom';

function Nav() {
  const { xl } = breakpoints;
  return (
    <Wrapper
      width={xl}
      justify="space-around"
      align="center"
      height="8"
      direction="row"
    >
      <Wrapper margin="0">
        <H5 font="header" color={styledTheme.warning}>
          ThreeSixtyTrailers
        </H5>
      </Wrapper>
      <Wrapper direction="row" justify="space-between" width="350">
        <Link to="/">
          <BigBody uppercase weight="700" cursor hover space="5">
            Home
          </BigBody>
        </Link>
        <Link to="/trending">
          <BigBody uppercase weight="700" cursor hover space="5">
            Trending
          </BigBody>
        </Link>
        <BigBody uppercase weight="700" cursor hover space="5">
          Movies
        </BigBody>
      </Wrapper>
      <Wrapper margin="0" direction="row" align="center">
        <BigBody right="0.5" uppercase weight="700">
          Profile
        </BigBody>
        <Image
          src="https://images.pexels.com/photos/5679150/pexels-photo-5679150.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          height="3"
          width="3"
        />
      </Wrapper>
    </Wrapper>
  );
}

export default Nav;
