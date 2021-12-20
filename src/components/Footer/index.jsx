import React from 'react';
import { BigBody, Wrapper } from '../../styles/GlobalComponents';
import { breakpoints } from '../../styles/Mixins';

const Footer = () => {
  const { xl, lg } = breakpoints;
  return (
    <Wrapper
      width={xl}
      align="left"
      lgWidth={lg}
      mdWidth="980"
      ptop="3"
      pbottom="3"
    >
      <BigBody>Created by Lorre Huggan</BigBody>
    </Wrapper>
  );
};

export default Footer;
