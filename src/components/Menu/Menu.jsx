import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { BigBody, H3, H4, H5 } from '../../styles/GlobalComponents';
import { FETCH_GENRE } from '../../utils/request';
import { Link } from 'react-router-dom';
import { MenuContext } from '../../contexts/MenuContext';
import { breakpoints, styledTheme } from '../../styles/Mixins';

export const Container = styled.div`
  width: ${({ width }) => width && `${width}px`};
  height: ${({ open }) => (open ? '15rem' : '0')};
  margin: 0rem auto;
  opacity: ${({ open }) => (open ? '1' : '0')};
  pointer-events: ${({ open }) => (open ? 'visible' : 'none')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  flex-direction: column;
  position: relative;
  transition: height 0.3s ease;
`;

export const Wrap = styled.div`
  width: 100%;
`;

export const Item = styled.span`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0.5rem 0.5rem;
  flex: wrap;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.warning};
  }
`;

const styledWrap = {
  display: 'grid',
  gridGap: '1rem',
  gridTemplateColumns: 'repeat(6, 1fr)',
  width: '100%',
};

function Menu() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const { openMenu, setOpenMenu } = useContext(MenuContext);
  const { xl } = breakpoints;

  useEffect(() => {
    fetch(FETCH_GENRE())
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch resource');
        }
        return res.json();
      })
      .then((data) => {
        setData(data.genres);
        setResults(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setLoading(false);
          setError(err.message);
        }
      });
  }, []);

  const handleClick = () => {
    setOpenMenu(false);
  };

  //Animations

  const menuVar = {
    hidden: { opacity: 0 },
    visible: {
      opacity: openMenu ? 1 : 0,
      transition: { duration: 0.6, delay: 0.3 },
    },
  };

  return (
    <Container open={openMenu} width={xl}>
      <Wrap style={styledWrap}>
        {data?.map((d) => {
          return (
            <Link onClick={handleClick} to={`/genre/${d.id}`}>
              <BigBody
                variants={menuVar}
                initial="hidden"
                animate="visible"
                style={{
                  padding: '0.25rem',
                  border: '0.5px solid white',
                }}
                weight="700"
                uppercase
                space="1.25"
                hover
                cursor
              >
                {`#${d.name}`}
              </BigBody>
            </Link>
          );
        })}
      </Wrap>
    </Container>
  );
}

export default Menu;
