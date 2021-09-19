import React from 'react';
import { MovieCard, BottomGradient } from './Card.styles';
import { Image } from '../../styles/GlobalComponents';

function Card({ imgPath, movie, loading }) {
  console.log(movie);
  return (
    <MovieCard
      whileHover={{
        filter: 'brightness(1.15)',
        y: -16,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      <Image
        src={imgPath + movie.poster_path}
        style={{ height: '100%', width: '100%' }}
        alt={movie.title}
      />
      <BottomGradient />
    </MovieCard>
  );
}

export default Card;
