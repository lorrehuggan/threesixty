import React, { useEffect, useState } from 'react';
import { Wrapper, H5, P, H4, BigBody } from '../../styles/GlobalComponents';
import useFetch from '../../hooks/useFetch';
import { baseURL, imgPath } from '../../utils/request';
import { breakpoints, styledTheme } from '../../styles/Mixins';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import { GridContainer } from './MovieRow.styles';
import { FiArrowRightCircle } from 'react-icons/fi';
import styled from 'styled-components';

export const Arrow = styled(FiArrowRightCircle)`
  height: 2rem;
  width: 2rem;
`;

function MovieRow({ req, title, id }) {
  const [url, setUrl] = useState('');
  const { data: movies, loading, error } = useFetch(url);
  const { xl } = breakpoints;

  useEffect(() => {
    setUrl(baseURL + req);
  }, [req]);

  const handleClick = () => {
    window.scroll(0, 0);
  };

  return (
    <Wrapper style={{ marginBottom: '1rem', marginTop: '1rem' }}>
      <Wrapper
        direction="row"
        justify="space-between"
        align="center"
        width={xl}
        style={{ marginBottom: '1rem' }}
      >
        <H5 color={styledTheme.warning} weight="800">
          {title}
        </H5>
        <Link
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          to={`/genre/${id}`}
        >
          <BigBody
            uppercase
            style={{ marginRight: '0.5rem' }}
            hover
            weight="900"
            cursor
          >
            More {title}
          </BigBody>
          <Arrow />
        </Link>
      </Wrapper>
      <GridContainer direction="row">
        {movies &&
          movies?.slice(0, 4).map((movie) => {
            return (
              <Link onClick={handleClick} to={`/film/${movie.id}`}>
                <Card
                  poster={movie.poster_path}
                  title={movie.title}
                  loading={loading}
                />
              </Link>
            );
          })}
      </GridContainer>
    </Wrapper>
  );
}

export default MovieRow;
