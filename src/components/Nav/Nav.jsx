import React, { useContext } from 'react';
import { Wrapper, H5, BigBody, Image } from '../../styles/GlobalComponents';
import { breakpoints, styledTheme, flex } from '../../styles/Mixins';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import SearchForm from '../Search/SearchForm';
import { MenuContext } from '../../contexts/MenuContext';

function Nav() {
  const { xl } = breakpoints;
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  const handleMenu = () => {
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };

  const handleClick = () => {
    if (openMenu) {
      setOpenMenu(false);
    }
  };

  return (
    <Wrapper
      width={xl}
      justify="space-between"
      align="center"
      height="8"
      direction="row"
    >
      <Wrapper margin="0">
        <Link onClick={handleClick} to="/">
          <H5 font="header" color={styledTheme.warning}>
            ThreeSixtyTrailers
          </H5>
        </Link>
      </Wrapper>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '490px',
        }}
      >
        <Link onClick={handleClick} to="/">
          <BigBody uppercase weight="700" cursor hover space="5">
            Home
          </BigBody>
        </Link>
        <Link onClick={handleClick} to="/trending">
          <BigBody uppercase weight="700" cursor hover space="5">
            Trending
          </BigBody>
        </Link>
        <Link onClick={handleClick} to={'/genre/16'}>
          <BigBody uppercase weight="700" cursor hover space="5">
            Animation
          </BigBody>
        </Link>
        <BigBody
          onClick={handleMenu}
          uppercase
          weight="700"
          cursor
          hover
          space="5"
        >
          Menu
        </BigBody>
      </Box>
      <Box>
        <SearchForm />
      </Box>

      {/* <Wrapper margin="0" direction="row" align="center">
        <BigBody right="0.5" uppercase weight="700">
          Profile
        </BigBody>
        <Image
          src="https://images.pexels.com/photos/5679150/pexels-photo-5679150.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          height="3"
          width="3"
        />
      </Wrapper> */}
    </Wrapper>
  );
}

export default Nav;
