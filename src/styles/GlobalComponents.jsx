import styled from 'styled-components';
import { flex } from '../styles/Mixins';

export const Wrapper = styled.div`
  ${flex};
  padding: ${({ padding }) => (padding ? `${padding}rem` : '0rem')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : '0rem')};
  max-width: ${({ width }) => (width ? `${width}%` : '')};
`;
