import React from 'react';
import { Wrapper } from '../../styles/GlobalComponents';
import { breakpoints } from '../../styles/Mixins';
import YouTube from 'react-youtube';

function Trailer({ movie, loading, error, trailerURL }) {
  const { xl } = breakpoints;

  const opts = {
    width: '100%',
    height: '490',
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      enablejsapi: 1,
      disablekb: 1,
    },
  };

  return (
    <Wrapper width={xl} style={{ marginTop: '2rem', marginBottom: '1rem' }}>
      <YouTube videoId={trailerURL} opts={opts} />
    </Wrapper>
  );
}

export default Trailer;
