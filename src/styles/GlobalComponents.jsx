import styled from 'styled-components';
import { flex, styledTheme } from '../styles/Mixins';

export const Wrapper = styled.div`
  padding: ${({ padding }) => (padding ? `${padding}rem` : '0rem')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : '0rem auto')};
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}rem` : 'auto')};
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  align-items: ${({ align }) => (align ? align : 'left')};
  justify-content: ${({ justify }) => (justify ? justify : 'left')};
  overflow: hidden;
  border-radius: ${({ radius }) => (radius ? `${radius}px` : 0)};
  position: ${({ pos }) => (pos ? pos : '')};
  top: ${({ top }) => (top ? `${top}rem` : '')};
  right: ${({ right }) => (right ? `${right}rem` : '')};
  bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : '')};
  left: ${({ left }) => (left ? `${left}rem` : '')};
`;

export const Container = styled.div`
  padding: ${({ padding }) => (padding ? `${padding}rem` : '0rem')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : '0rem auto')};
  width: ${({ width }) => (width ? `${width}%` : 'auto')};
  height: ${({ height }) => (height ? `${height}rem` : 'auto')};
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'left')};
  align-items: ${({ align }) => (align ? align : 'left')};
  justify-content: ${({ justify }) => (justify ? justify : 'left')};
`;

export const H1 = styled.h1`
  font-size: ${styledTheme.superHero};
  font-family: ${({ font }) =>
    font === 'header' ? styledTheme.headerFont : ''};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => (color ? color : '')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : 0)};
  margin-right: ${({ right }) => (right ? `${right}rem` : 0)};
  margin-bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : 0)};
  margin-left: ${({ left }) => (left ? `${left}rem` : 0)};
  margin-top: ${({ top }) => (top ? `${top}rem` : 0)};
`;

export const P = styled.p`
  line-height: 1.4;
  letter-spacing: 0.3px;
  font-size: ${styledTheme.body};
  font-family: ${({ font }) =>
    font === 'header' ? styledTheme.headerFont : ''};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => (color ? color : '')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : 0)};
  margin-right: ${({ right }) => (right ? `${right}rem` : 0)};
  margin-bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : 0)};
  margin-left: ${({ left }) => (left ? `${left}rem` : 0)};
  margin-top: ${({ top }) => (top ? `${top}rem` : 0)};
`;

export const BigBody = styled.p`
  font-size: ${styledTheme.bodyBig};
  font-family: ${({ font }) =>
    font === 'header' ? styledTheme.headerFont : ''};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => (color ? color : '')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : 0)};
  margin-right: ${({ right }) => (right ? `${right}rem` : 0)};
  margin-bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : 0)};
  margin-left: ${({ left }) => (left ? `${left}rem` : 0)};
  margin-top: ${({ top }) => (top ? `${top}rem` : 0)};
`;

export const SubHeader = styled.h5`
  font-size: ${styledTheme.subHeader};
  font-family: ${({ font }) =>
    font === 'header' ? styledTheme.headerFont : ''};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => (color ? color : '')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : 0)};
  margin-right: ${({ right }) => (right ? `${right}rem` : 0)};
  margin-bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : 0)};
  margin-left: ${({ left }) => (left ? `${left}rem` : 0)};
  margin-top: ${({ top }) => (top ? `${top}rem` : 0)};
`;

export const Image = styled.img`
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  object-fit: cover;
  overflow: hidden;
  border-radius: ${({ radius }) => (radius ? `${radius}px` : 0)};
  position: ${({ pos }) => (pos ? pos : '')};
  top: ${({ top }) => (top ? `${top}rem` : '')};
  right: ${({ right }) => (right ? `${right}rem` : '')};
  bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : '')};
  left: ${({ left }) => (left ? `${left}rem` : '')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : '0rem auto')};
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
