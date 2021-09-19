import React, { useEffect, useState } from 'react';
import { Wrapper, H5, P } from '../../styles/GlobalComponents';
import useFetch from '../../hooks/useFetch';
import { baseURL, imgPath } from '../../utils/request';
import { breakpoints, styledTheme } from '../../styles/Mixins';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import { GridContainer } from './MovieRow.styles';

function MovieRow({ req, title }) {
  const [url, setUrl] = useState('');
  const { data: movies, loading, error } = useFetch(url);
  const { xl } = breakpoints;

  useEffect(() => {
    setUrl(baseURL + req);
  }, [req]);

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
        <P weight="700" cursor>
          More {title}
        </P>
      </Wrapper>
      <GridContainer>
        {movies &&
          movies?.slice(0, 5).map((movie) => {
            return (
              <Link to={`/film/${movie.id}`}>
                <Card imgPath={imgPath} movie={movie} loading={loading} />
              </Link>
            );
          })}
      </GridContainer>
    </Wrapper>
  );
}

export default MovieRow;
