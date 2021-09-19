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
