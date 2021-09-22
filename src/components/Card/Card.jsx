import React from 'react';
import { MovieCard, BottomGradient } from './Card.styles';
import { BigBody, H5, Image, Wrapper } from '../../styles/GlobalComponents';
import { imgPath } from '../../utils/request';
import { styledTheme } from '../../styles/Mixins';

const noImage = {
  backgroundColor: styledTheme.primary,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '1rem',
  textAlign: 'center',
};

function Card({ title, poster, loading, grid }) {
  return (
    <MovieCard
      whileHover={{
        filter: 'brightness(1.15)',
        y: -16,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      grid={grid}
    >
      {!poster && (
        <div style={noImage}>
          <H5>{title}</H5>
        </div>
      )}
      {poster && (
        <Image
          src={imgPath + poster}
          alt={title}
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
