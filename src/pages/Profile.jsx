import React, { useState, useEffect } from 'react';
import { H1, H4, H5, P, Wrapper } from '../styles/GlobalComponents';
import { breakpoints, styledTheme, media } from '../styles/Mixins';
import FilmBanner from '../components/Banner/FilmBanner/FilmBanner';
import { useParams } from 'react-router-dom';
import Trailer from '../components/Trailer/Trailer';
import { FETCH_GENRE, FETCH_ID, FETCH_RECOMMENDATIONS } from '../utils/request';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import movieTrailer from 'movie-trailer';
import { Link } from 'react-router-dom';
import Card from '../components/Card/Card';
import { GridContainer } from '../components/MovieRow/MovieRow.styles';
import { GiFilmProjector } from 'react-icons/gi';
import useUser from '../hooks/useUser';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import useFetch from '../hooks/useFetch';
import { motion } from 'framer-motion';
import { SkeletonCard } from '../components/Card/Card.styles';

export const Grid = styled(motion.div)`
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

const Profile = () => {
  const { userData } = useUser();
  const [_data, setData] = useState([]);
  const { xl, lg } = breakpoints;
  const [loading, setLoading] = useState(false);
  const [movieAmount, setMovieAmount] = useState(4);
  const [width, setWidth] = useState('');

  useEffect(() => {
    if (window.innerWidth <= xl) {
      setMovieAmount(5);
    } else {
      setMovieAmount(4);
    }
  }, [width, xl]);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
  });

  useEffect(() => {
    setLoading(true);
    async function getLikedFilms() {
      let promise = [];
      for (let i = 0; i < userData?.likes?.length; i++) {
        const response = await fetch(FETCH_ID(userData?.likes[i]));
        const data = await response.json();
        promise.push(data);
      }
      const result = Promise.all(promise);
      return result
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    getLikedFilms();
  }, [userData]);

  console.log(_data);

  let skeletonArray = new Array(_data.length).fill('i');

  const gridVar = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  const headerVar = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <Wrapper width={xl} align="center" lgWidth={lg} hidden mdWidth="980">
      <Wrapper width={xl} align="left" lgWidth={lg} hidden mdWidth="980">
        <H1
          variants={headerVar}
          initial="hidden"
          animate="visible"
          transition={{
            duration: '0.7',
          }}
          style={{ marginBottom: '1rem' }}
          lgFontSize={styledTheme.headline}
        >
          My Account
        </H1>
      </Wrapper>
      <Wrapper width={xl} align="left" lgWidth={lg} hidden mdWidth="980">
        <P
          variants={headerVar}
          initial="hidden"
          animate="visible"
          transition={{
            duration: '0.7',
          }}
          style={{ marginBottom: '1rem', fontSize: '2rem' }}
          lgFontSize={styledTheme.bodyBig}
        >
          {_data.length === 0 ? 'No Films Saved' : 'My Favorite Films'}
        </P>
      </Wrapper>
      <Wrapper width={xl} align="left" lgWidth={lg} hidden mdWidth="980">
        <Grid count={movieAmount}>
          {loading &&
            skeletonArray.map((arr, idx) => {
              return <SkeletonCard key={idx} />;
            })}

          {_data.map((d, idx) => (
            <motion.div
              key={idx}
              variants={gridVar}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <Link to={`/film/${d.id}`}>
                <Card grid poster={d.poster_path} />
              </Link>
            </motion.div>
          ))}
        </Grid>
      </Wrapper>
    </Wrapper>
  );
};

export default Profile;
