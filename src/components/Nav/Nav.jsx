import React, { useContext } from 'react';
import { Wrapper, H5, BigBody } from '../../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../../styles/Mixins';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import SearchForm from '../Search/SearchForm';
import { MenuContext } from '../../contexts/MenuContext';

function Nav() {
  const { xl, md, sm, lg } = breakpoints;
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
      lgWidth={lg}
      mdWidth="980"
    >
      <Wrapper margin="0">
        <Link onClick={handleClick} to="/">
          <H5
            font="header"
            color={styledTheme.warning}
            lgFontSize={styledTheme.bodyBig}
          >
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
          <BigBody
            uppercase
            weight="700"
            cursor
            hover
            space="5"
            mdFontSize={styledTheme.body}
          >
            Home
          </BigBody>
        </Link>
        <Link onClick={handleClick} to="/trending">
          <BigBody
            uppercase
            weight="700"
            cursor
            hover
            space="5"
            mdFontSize={styledTheme.body}
          >
            Trending
          </BigBody>
        </Link>
        <Link onClick={handleClick} to={'/genre/16'}>
          <BigBody
            uppercase
            weight="700"
            cursor
            hover
            space="5"
            mdFontSize={styledTheme.body}
          >
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
          color={openMenu ? styledTheme.error : ''}
          mdFontSize={styledTheme.body}
        >
          {openMenu ? 'Close' : 'Menu'}
        </BigBody>
      </Box>
      <Box>
        <SearchForm />
      </Box>
    </Wrapper>
  );
}

export default Nav;
