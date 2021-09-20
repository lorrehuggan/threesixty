import React from 'react';
import { MovieCard, BottomGradient } from './Card.styles';
import { Image, Wrapper } from '../../styles/GlobalComponents';
import { imgPath } from '../../utils/request';

function Card({ title, poster, loading, grid }) {
  return (
    <MovieCard
      whileHover={{
        filter: 'brightness(1.2)',
        y: -16,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      grid={grid}
    >
      <Image
        src={imgPath + poster}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      <BottomGradient />
    </MovieCard>
  );
}

export default Card;
