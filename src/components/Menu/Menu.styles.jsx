import styled from 'styled-components';
import { media } from '../../styles/Mixins';

export const Container = styled.div`
  width: ${({ width }) => width && `${width}px`};
  height: ${({ open }) => (open ? '15rem' : '0')};
  margin: 0rem auto;
  opacity: ${({ open }) => (open ? '1' : '0')};
  pointer-events: ${({ open }) => (open ? 'visible' : 'none')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-direction: column;
  position: relative;
  transition: height 0.3s ease;
  ${media.large} {
    width: ${({ lgWidth }) => (lgWidth ? `${lgWidth}px` : '')};
    height: ${({ lgHeight }) => (lgHeight ? `${lgHeight}rem` : '')};
  }
`;

export const Wrap = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(5, 1fr);
`;

export const Item = styled.span`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0.5rem 0.5rem;
  flex: wrap;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.success};
  }
`;
