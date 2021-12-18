import React, { useState, useEffect } from 'react';
import { H4, H5, P, Wrapper } from '../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../styles/Mixins';
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

const Profile = () => {
  const { userData } = useUser();
  const [_data, setData] = useState([]);

  useEffect(() => {
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
        })
        .catch((err) => console.log(err));
    }

    getLikedFilms();
  }, [userData]);

  console.log(_data);

  return (
    <div>
      {_data.map((data) => {
        return data.original_title;
      })}
    </div>
  );
};

export default Profile;
