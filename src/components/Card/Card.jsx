import React, { useState } from 'react';
import { MovieCard, BottomGradient, TopGradient } from './Card.styles';
import { H5, Image } from '../../styles/GlobalComponents';
import { imgPath } from '../../utils/request';
import { styledTheme } from '../../styles/Mixins';
import { motion } from 'framer-motion';

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
  const [hover, setHover] = useState(false);

  return (
    <motion.div>
      <MovieCard
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        whileHover={{
          filter: 'brightness(1.2)',
          y: -16,
          transition: { duration: '0.4', ease: 'easeOut' },
          boxShadow: '15px 15px 19px #060606',
        }}
        grid={grid}
        lgWidth="12"
        lgHeight="22"
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

        <BottomGradient hover={hover} />
      </MovieCard>
    </motion.div>
  );
}

export default Card;
