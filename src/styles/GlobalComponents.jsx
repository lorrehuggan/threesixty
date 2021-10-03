import styled from 'styled-components';
import { flex, styledTheme } from '../styles/Mixins';
import { motion } from 'framer-motion';
import { breakpoints, media } from '../styles/Mixins';

export const Wrapper = styled(motion.div)`
  padding: ${({ padding }) => (padding ? `${padding}rem` : '0rem')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : '0rem auto')};
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}rem` : 'auto')};
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  align-items: ${({ align }) => (align ? align : 'left')};
  justify-content: ${({ justify }) => (justify ? justify : 'left')};
  overflow: ${({ hidden }) => (hidden ? '' : 'hidden')};
  border-radius: ${({ radius }) => (radius ? `${radius}px` : 0)};
  position: ${({ pos }) => (pos ? pos : '')};
  top: ${({ top }) => (top ? `${top}rem` : '')};
  right: ${({ right }) => (right ? `${right}rem` : '')};
  bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : '')};
  left: ${({ left }) => (left ? `${left}rem` : '')};
  ${media.large} {
    width: ${({ lgWidth }) => (lgWidth ? `${lgWidth}px` : '')};
    height: ${({ lgHeight }) => (lgHeight ? `${lgHeight}rem` : '')};
  }
  ${media.laptop} {
    width: ${({ mdWidth }) => (mdWidth ? `${mdWidth}px` : '')};
    height: ${({ mdHeight }) => (mdHeight ? `${mdHeight}rem` : '')};
  }
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
  ${media.large} {
    width: ${({ lgWidth }) => (lgWidth ? `${lgWidth}px` : '')};
    height: ${({ lgHeight }) => (lgHeight ? `${lgHeight}rem` : '')};
  }
  ${media.laptop} {
    width: ${({ mdWidth }) => (mdWidth ? `${mdWidth}px` : '')};
    height: ${({ mdHeight }) => (mdHeight ? `${mdHeight}rem` : '')};
  }
`;

export const H1 = styled(motion.h1)`
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
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
  cursor: ${({ cursor }) => cursor && 'pointer'};
  transition: color 0.3s ease;
  &:hover {
    color: ${({ hover, theme }) => hover && theme.warning};
  }
  ${media.large} {
    font-size: ${({ lgFontSize }) => (lgFontSize ? lgFontSize : '')};
  }
`;
export const H2 = styled.h2`
  font-size: ${styledTheme.heroHeadline};
  font-family: ${({ font }) =>
    font === 'header' ? styledTheme.headerFont : ''};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => (color ? color : '')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : 0)};
  margin-right: ${({ right }) => (right ? `${right}rem` : 0)};
  margin-bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : 0)};
  margin-left: ${({ left }) => (left ? `${left}rem` : 0)};
  margin-top: ${({ top }) => (top ? `${top}rem` : 0)};
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
  cursor: ${({ cursor }) => cursor && 'pointer'};
  transition: color 0.3s ease;
  &:hover {
    color: ${({ hover, theme }) => hover && theme.warning};
  }
`;

export const H3 = styled.h3`
  font-size: ${styledTheme.headline};
  font-family: ${({ font }) =>
    font === 'header' ? styledTheme.headerFont : ''};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => (color ? color : '')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : 0)};
  margin-right: ${({ right }) => (right ? `${right}rem` : 0)};
  margin-bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : 0)};
  margin-left: ${({ left }) => (left ? `${left}rem` : 0)};
  margin-top: ${({ top }) => (top ? `${top}rem` : 0)};
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
  cursor: ${({ cursor }) => cursor && 'pointer'};
  transition: color 0.3s ease;
  &:hover {
    color: ${({ hover, theme }) => hover && theme.warning};
  }
`;

export const H4 = styled.h4`
  font-size: ${styledTheme.header};
  font-family: ${({ font }) =>
    font === 'header' ? styledTheme.headerFont : ''};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => (color ? color : '')};
  margin: ${({ margin }) => (margin ? `${margin}rem` : 0)};
  margin-right: ${({ right }) => (right ? `${right}rem` : 0)};
  margin-bottom: ${({ bottom }) => (bottom ? `${bottom}rem` : 0)};
  margin-left: ${({ left }) => (left ? `${left}rem` : 0)};
  margin-top: ${({ top }) => (top ? `${top}rem` : 0)};
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
  cursor: ${({ cursor }) => cursor && 'pointer'};
  transition: color 0.3s ease;
  &:hover {
    color: ${({ hover, theme }) => hover && theme.warning};
  }
`;

export const H5 = styled(motion.h5)`
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
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
  cursor: ${({ cursor }) => cursor && 'pointer'};
  transition: color 0.3s ease;
  &:hover {
    color: ${({ hover, theme }) => hover && theme.warning};
  }
  ${media.large} {
    font-size: ${({ lgFontSize }) => (lgFontSize ? lgFontSize : '')};
  }
  ${media.laptop} {
    font-size: ${({ mdFontSize }) => (mdFontSize ? mdFontSize : '')};
  }
`;

export const P = styled(motion.p)`
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
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
  cursor: ${({ cursor }) => cursor && 'pointer'};
  padding: ${({ padding }) => (padding ? `${padding}rem` : '')};
  transition: color 0.3s ease;
  &:hover {
    color: ${({ hover, theme }) => hover && theme.warning};
  }
`;

export const BigBody = styled(motion.span)`
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
  text-transform: ${({ uppercase }) => uppercase && 'uppercase'};
  cursor: ${({ cursor }) => cursor && 'pointer'};
  letter-spacing: ${({ space }) => `${space}px`};
  transition: color 0.3s ease;
  &:hover {
    color: ${({ hover, theme }) => hover && theme.warning};
  }
  ${media.large} {
    font-size: ${({ lgFontSize }) => (lgFontSize ? lgFontSize : '')};
  }
  ${media.laptop} {
    font-size: ${({ mdFontSize }) => (mdFontSize ? mdFontSize : '')};
  }
`;

export const Image = styled(motion.img)`
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
  box-shadow: ${({ shadow }) =>
    shadow
      ? `
  5.3px 5.3px 5.6px rgba(0, 0, 0, 0.034),
  11.1px 11.1px 13.6px rgba(0, 0, 0, 0.048),
  18.1px 18.1px 25.5px rgba(0, 0, 0, 0.06),
  27.9px 27.9px 45.6px rgba(0, 0, 0, 0.072),
  45.8px 45.8px 85.2px rgba(0, 0, 0, 0.086),
  100px 100px 204px rgba(0, 0, 0, 0.12)`
      : ''};
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

export const Grid = styled.div`
  width: ${breakpoints.xl};
  display: grid;
  grid-template-columns: repeat(${({ count }) => count}, 1fr);
  grid-template-rows: auto;
  grid-gap: 0.5rem;
  ${media.large} {
    width: ${({ lgWidth }) => (lgWidth ? `${lgWidth}px` : '')};
    height: ${({ lgHeight }) => (lgHeight ? `${lgHeight}rem` : '')};
  }
`;

export const Button = styled.button`
  padding: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  background-color: ${({ theme }) => theme.textPrimary};
  border: none;
  border-radius: 4px;
  font-weight: 900;
  font-size: ${styledTheme.header};
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: grey;
  }
`;
