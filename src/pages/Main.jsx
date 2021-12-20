import React, { useState, useEffect } from 'react';
import { Wrapper, BigBody, H5 } from '../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../styles/Mixins';
import Banner from '../components/Banner/HomeBanner/Banner';
import MovieRow, { ArrowUp } from '../components/MovieRow/MovieRow';
import {
  FETCH_GENRE,
  FETCH_CATEGORIES,
  FETCH_RECOMMENDATIONS,
} from '../utils/request';
import useUser from '../hooks/useUser';
import Footer from '../components/Footer';

function Main() {
  const { xl, lg } = breakpoints;
  const [genre, setGenre] = useState(null);
  const { userData } = useUser();
  const [userLikedFilms, setUserLikeFilms] = useState('');

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

  useEffect(() => {
    setUserLikeFilms(userData.likes);
  }, [userData]);

  const toTop = () => {
    window.scroll(0, 0);
  };

  const userFilmSelector = () => {
    const select = Math.floor(Math.random() * userLikedFilms?.length);
    return select;
  };

  return (
    <Wrapper hidden width={xl} align="center" lgWidth={lg} mdWidth="980">
      <Banner opacity="0.5" hOpacity="0" />
      {/* if there is a user logged in fetch users recommended film  */}
      {userLikedFilms?.length > 0 && (
        <MovieRow
          request={FETCH_RECOMMENDATIONS(userLikedFilms[userFilmSelector()])}
          title={'Just For You'}
          id=""
          user
        />
      )}
      {genre &&
        genre?.map((g, idx) => {
          return (
            <MovieRow
              key={idx}
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
        <H5
          style={{ marginLeft: '2rem' }}
          onClick={toTop}
          cursor
          color={styledTheme.warning}
          weight="800"
        >
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
      <Footer />
    </Wrapper>
  );
}

export default Main;
