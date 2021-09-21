import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { BigBody, H3, H4, H5 } from '../../styles/GlobalComponents';
import useFetch from '../../hooks/useFetch';
import { request, baseURL } from '../../utils/request';
import { Link } from 'react-router-dom';
import { MenuContext } from '../../contexts/MenuContext';

export const Container = styled.div`
  width: 25rem;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 1.5rem;
  opacity: ${({ open }) => (open ? '1' : '0')};
  pointer-events: ${({ open }) => (open ? 'visible' : 'none')};
`;

export const Wrap = styled.div`
  width: 100%;
`;

function Menu() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  useEffect(() => {
    fetch(baseURL + request.fetchGenre)
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

  return (
    <Container open={openMenu}>
      <Wrap>
        <H3>Menu</H3>
      </Wrap>
      {data?.map((d) => {
        return (
          <Wrap
            style={{
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            <Link to={`/genre/${d.id}`}>
              <H5 hover cursor uppercase weight="300">
                {d.name}
              </H5>
            </Link>
          </Wrap>
        );
      })}
    </Container>
  );
}

export default Menu;
