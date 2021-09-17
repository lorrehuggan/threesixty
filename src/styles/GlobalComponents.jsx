import styled from 'styled-components';
import { flex } from '../styles/Mixins';

export const Wrapper = styled.div`
  ${flex};
  padding: ${({ padding }) => (padding ? `${padding}rem` : '0rem')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : '0rem')};
  max-width: ${({ width }) => (width ? `${width}%` : 0)};
  height: ${({ height }) => (height ? `${height}vh` : 0)};
`;

export const MorphButton = styled.button`
  border: none;
  height: ${({ height }) => (height ? `${height}px` : '90px')};
  width: ${({ width }) => (width ? `${width}px` : '90px')};
  border-radius: ${({ radius }) => (radius ? `${radius}px` : '78px')};
  background: #ffd166;
  box-shadow: 22px 22px 43px #d9b257, -22px -22px 43px #fff075;
  cursor: pointer;
  ${flex}
  &:active {
    box-shadow: 11px 11px 43px #d9b257, 0px -11px 43px #fff075;
  }
`;
