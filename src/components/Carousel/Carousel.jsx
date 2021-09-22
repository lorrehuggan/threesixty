import React from 'react';
import { Wrapper } from '../../styles/GlobalComponents';
import { breakpoints } from '../../styles/Mixins';
import Slider from 'react-slick';
import useFetch from '../../hooks/useFetch';
import { baseURL, request } from '../../utils/request';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

function Carousel() {
  const { xl } = breakpoints;
  const { data, loading, error } = useFetch(baseURL + request.fetchTrending);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <Wrapper width={xl}>
      <Slider {...settings}>
        {/* {data?.slice(0, 4).map((d) => {
          return (
            <Link to={`/film/${d.id}`}>
              <Card grid poster={d.poster_path} title={d.title} />
            </Link>
          );
        })} */}
      </Slider>
    </Wrapper>
  );
}

export default Carousel;
