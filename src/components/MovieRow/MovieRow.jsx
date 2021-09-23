import React, { useEffect, useState, useContext } from 'react';
import { Wrapper, H5, BigBody } from '../../styles/GlobalComponents';
import useFetch from '../../hooks/useFetch';
import { breakpoints, styledTheme } from '../../styles/Mixins';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import { GridContainer } from './MovieRow.styles';
import { FiArrowRightCircle, FiArrowUpCircle } from 'react-icons/fi';
import styled from 'styled-components';
import { SkeletonCard } from '../Card/Card.styles';
import { MenuContext } from '../../contexts/MenuContext';
import { motion } from 'framer-motion';

export const Arrow = styled(FiArrowRightCircle)`
  height: 2rem;
  width: 2rem;
`;

export const ArrowUp = styled(FiArrowUpCircle)`
  height: 2rem;
  width: 2rem;
`;

function MovieRow({ request, title, id }) {
  const [url, setUrl] = useState('');
  const { data: movies, loading, error } = useFetch(url);
  const { xl } = breakpoints;
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  useEffect(() => {
    setUrl(request);
  }, [request]);

  const handleClick = () => {
    window.scroll(0, 0);
    if (openMenu) {
      setOpenMenu(false);
    }
  };

  let skeletonArray = new Array(4).fill('i');
  // Animation

  const gridVar = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <>
      <Wrapper hidden style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        <Wrapper
          direction="row"
          justify="space-between"
          align="center"
          width={xl}
          style={{ marginBottom: '1rem' }}
        >
          <H5 left="2" color={styledTheme.warning} weight="800">
            {title}
          </H5>
          <Link
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            to={`/genre/${id}`}
            onClick={handleClick}
          >
            <BigBody
              uppercase
              style={{ marginRight: '0.5rem' }}
              hover
              weight="900"
              cursor
              space="5"
            >
              More {title}
            </BigBody>
            <Arrow />
          </Link>
        </Wrapper>
        <GridContainer direction="row">
          <>
            {error &&
              skeletonArray.map(() => {
                return <SkeletonCard />;
              })}
            {loading &&
              skeletonArray.map(() => {
                return <SkeletonCard />;
              })}
            {movies &&
              movies?.slice(0, 4).map((movie, i) => {
                return (
                  <motion.div
                    variants={gridVar}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.4, delay: i * 0.4 }}
                  >
                    <Link onClick={handleClick} to={`/film/${movie.id}`}>
                      <Card
                        poster={movie.poster_path}
                        title={movie.title}
                        loading={loading}
                      />
                    </Link>
                  </motion.div>
                );
              })}
          </>
        </GridContainer>
      </Wrapper>
    </>
  );
}

export default MovieRow;
