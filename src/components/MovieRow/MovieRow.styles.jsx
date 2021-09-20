import styled from 'styled-components';
import { flex } from '../../styles/Mixins';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.5rem;
  margin-top: 1rem;
  ${flex}
`;
