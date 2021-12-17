import React, { useState, useEffect } from 'react';
import { Wrapper, H1, BigBody, H5 } from '../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../styles/Mixins';
import Banner from '../components/Banner/HomeBanner/Banner';
import MovieRow, { ArrowUp } from '../components/MovieRow/MovieRow';
import { useParams } from 'react-router-dom';
import Trailer from '../components/Trailer/Trailer';
import { FETCH_ID, FETCH_GENRE, FETCH_CATEGORIES } from '../utils/request';
import useFetch from '../hooks/useFetch';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';

function Main() {
  const { xl, lg, md } = breakpoints;
  const { id } = useParams();
  const [trailerURL, setTrailerURL] = useState('');
  const [trailerError, setTrailerError] = useState(false);
  const [genre, setGenre] = useState(null);
  const { data: movie, loading, error } = useFetch(FETCH_ID(id));
  const { currentUser } = useAuth();

  useEffect(() => {
    fetch(FETCH_GENRE())
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch resource');
        }
        return res.json();
      })
      .then((data) => {
        setGenre(data.genres);
      })

      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log('error');
        }
      });
  }, []);

  const toTop = () => {
    window.scroll(0, 0);
  };

  return (
    <Wrapper hidden width={xl} align="center" lgWidth={lg} mdWidth="980">
      <Banner
        opacity="0.35"
        hOpacity="0.5"
        trailerURL={trailerURL}
        setTrailerURL={setTrailerURL}
        trailerError={trailerError}
        setTrailerError={setTrailerError}
      />
      {trailerURL && (
        <Trailer
          movie={movie}
          loading={loading}
          error={error}
          trailerURL={trailerURL}
        />
      )}
      {trailerError && <H1 lgFontSize={styledTheme.headline}>Error</H1>}

      {genre &&
        genre?.map((g) => {
          return (
            <MovieRow
              request={FETCH_CATEGORIES(g.id, 1)}
              title={g.name}
              id={g.id}
            />
          );
        })}

      <Wrapper
        direction="row"
        justify="space-between"
        align="center"
        width={xl}
        style={{ marginBottom: '5rem' }}
        lgWidth={lg}
      >
        <H5 onClick={toTop} cursor color={styledTheme.warning} weight="800">
          Back To Top
        </H5>
        <div
          style={{
            display: 'flex',
            felxDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BigBody
            uppercase
            style={{ marginRight: '0.5rem' }}
            hover
            weight="900"
            cursor
            space="5"
            onClick={toTop}
          >
            Back To Top
          </BigBody>
          <ArrowUp />
        </div>
      </Wrapper>
    </Wrapper>
  );
}

export default Main;
