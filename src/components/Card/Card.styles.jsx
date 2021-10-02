import styled from 'styled-components';
import { motion } from 'framer-motion';
import { flex, media } from '../../styles/Mixins';

export const MovieCard = styled(motion.div)`
  position: relative;
  ${flex}
  width: 22rem;
  height: 32rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.secondaryText};
  cursor: pointer;
  opacity: 1;
  overflow: hidden;
  margin-top: ${({ grid }) => (grid ? '1rem' : '')};
  ${media.large} {
    width: ${({ lgWidth }) => (lgWidth ? `${lgWidth}rem` : '')};
    height: ${({ lgHeight }) => (lgHeight ? `${lgHeight}rem` : '')};
  }
`;

export const BottomGradient = styled.div`
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.textSecondary},
    transparent
  );
  width: 100%;
  height: 5rem;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  opacity: ${({ hover }) => (hover ? '0' : '1')};
  transition: opacity 0.6s ease;
`;
export const TopGradient = styled.div`
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.textSecondary},
    transparent
  );
  width: 100%;
  height: 5rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

export const SkeletonCard = styled.div`
  width: 22rem;
  height: 32rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.textSecondary};
  margin-top: ${({ grid }) => (grid ? '1rem' : '')};
`;
