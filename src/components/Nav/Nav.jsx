import React from 'react';
import { Wrapper, Container } from '../../styles/GlobalComponents';
import { breakpoints } from '../../styles/Mixins';

function Nav() {
  const { xl, lg } = breakpoints;
  return (
    <Wrapper
      width={lg}
      justify="space-between"
      align="center"
      padding="0"
      direction="row"
    >
      <Container width="100" height="10" align="center" padding="0">
        <div>Hello</div>
      </Container>
      <Container>
        <div>Hello</div>
        <div>Hello</div>
        <div>Hello</div>
        <div>Hello</div>
      </Container>
    </Wrapper>
  );
}

export default Nav;
