import styled from 'styled-components';
import { motion } from 'framer-motion';
import { flex } from '../../styles/Mixins';

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
`;

export const SkeletonCard = styled.div`
  width: 22rem;
  height: 32rem;
  border-radius: 4px;
  background-color: #000000;
  margin-top: ${({ grid }) => (grid ? '1rem' : '')};
`;
