import React, { useEffect, useState, useContext } from 'react';
import { BigBody } from '../../styles/GlobalComponents';
import { FETCH_GENRE } from '../../utils/request';
import { Link } from 'react-router-dom';
import { MenuContext } from '../../contexts/MenuContext';
import { breakpoints, styledTheme } from '../../styles/Mixins';
import { Container, Wrap } from './Menu.styles';

function Menu() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const { openMenu, setOpenMenu } = useContext(MenuContext);
  const { xl, lg } = breakpoints;

  useEffect(() => {
    fetch(FETCH_GENRE())
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch resource');
        }
        return res.json();
      })
      .then((data) => {
        setData(data.genres);
        setResults(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          setLoading(false);
          setError(err.message);
        }
      });
  }, []);

  const handleClick = () => {
    setOpenMenu(false);
  };

  //Animations

  const menuVar = {
    hidden: { opacity: 0 },
    visible: {
      opacity: openMenu ? 1 : 0,
      transition: { duration: 0.6, delay: 0.3 },
    },
  };

  return (
    <Container open={openMenu} width={xl} lgWidth={lg}>
      <Wrap>
        {data?.map((d) => {
          return (
            <Link onClick={handleClick} to={`/genre/${d.id}`}>
              <BigBody
                variants={menuVar}
                initial="hidden"
                animate="visible"
                style={{
                  padding: '0.25rem',
                  border: '0.5px solid white',
                }}
                weight="700"
                uppercase
                space="1.25"
                hover
                cursor
                lgFontSize={styledTheme.body}
              >
                {`#${d.name}`}
              </BigBody>
            </Link>
          );
        })}
      </Wrap>
    </Container>
  );
}

export default Menu;
