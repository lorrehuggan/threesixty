import React from 'react';
import { MovieCard, BottomGradient } from './Card.styles';
import { Image, Wrapper } from '../../styles/GlobalComponents';

function Card({ imgPath, movie, loading }) {
  return (
    <MovieCard
      whileHover={{
        filter: 'brightness(1.2)',
        y: -16,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      {loading ? (
        <Wrapper
          style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
        ></Wrapper>
      ) : (
        <Image
          src={imgPath + movie.poster_path}
          alt={movie.title}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
      <BottomGradient />
    </MovieCard>
  );
}

export default Card;
