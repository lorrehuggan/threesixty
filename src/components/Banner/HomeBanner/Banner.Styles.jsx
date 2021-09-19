import styled from 'styled-components';
import { Wrapper, BigBody } from '../../../styles/GlobalComponents';

export const Poster = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 2rem;
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: ${({ opacity }) => opacity};
    background-color: ${({ theme }) => theme.textSecondary};
    background-image: url(${({ src }) => src});
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  &:hover::before {
    opacity: ${({ hOpacity }) => hOpacity};
  }
`;

export const StyledWrapper = styled(Wrapper)`
  width: 100%;
`;
export const InnerWrapper = styled(Wrapper)`
  width: 50%;
`;

export const StyledBigBody = styled(BigBody)`
  cursor: pointer;
  border: 1px solid primary;
  display: inline;
  padding: 0.5rem 0rem;
  width: 15.9%;
  background-color: #80808040;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #80808060;
    box-shadow: 1.4px 4.2px 5.3px rgba(0, 0, 0, 0.048),
      4.7px 14.1px 17.9px rgba(0, 0, 0, 0.072),
      21px 63px 80px rgba(0, 0, 0, 0.12);
  }
  &:active {
    background-color: #80808099;
    box-shadow: 1.4px 4.2px 5.3px rgba(0, 0, 0, 0.048),
      21px 63px 80px rgba(0, 0, 0, 0.12);
  }
`;

export const BottomGradient = styled.div`
  background-image: linear-gradient(
    to ${({ gradient }) => (gradient ? 'top' : 'bottom')},
    ${({ theme }) => theme.textSecondary},
    transparent
  );
  width: 100%;
  height: 20rem;
  position: absolute;
  bottom: ${({ bottom }) => (bottom ? '0' : '')};
  top: ${({ top }) => (top ? 0 : '')};
  left: 0;
  z-index: -1;
`;
