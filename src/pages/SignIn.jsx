import React, { useState, useEffect } from 'react';
import { Wrapper, H3, Alert, Button, H5 } from '../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../styles/Mixins';
import { FaExclamation, FaCheck } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const SignIn = () => {
  const [userSignUp, setUserSignUp] = useState({
    email: '',
    password: '',
  });
  const [passError, setPassError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { xl, lg, md } = breakpoints;
  const { login, currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
  }, [currentUser, history]);

  //form styles
  const input = {
    height: '2rem',
    border: 'none',
    outline: 'none',
    padding: '0.25rem',
    borderRadius: '2px',
    width: '100%',
    fontSize: '1rem',
  };

  const label = {
    fontSize: '1rem',
    letterSpacing: '0.5px',
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  };

  //firebase

  //form handling
  function formSubmit(e) {
    e.preventDefault();
    if (!userSignUp.email || !userSignUp.password) {
      return setPassError('Credentials not valid');
    }

    setLoading(true);
    login(userSignUp.email, userSignUp.password)
      .then((res) => {
        history.push('/');
      })
      .catch((err) => {
        if (err.message === 'Firebase: Error (auth/user-not-found).') {
          return setPassError('Email or password incorrect ');
        }
      })
      .finally(() => {
        setLoading(false);
      });
    setUserSignUp({
      email: '',
      password: '',
    });
  }

  const handleChange = (e) => {
    setPassError(false);
    setUserSignUp({
      ...userSignUp,
      [e.target.name]: e.target.value,
    });
  };

  const page = {
    height: '100vh',
  };

  return (
    <Wrapper
      hidden
      width={xl}
      align="center"
      justify="center"
      lgWidth={lg}
      mdWidth="980"
      style={page}
    >
      <Wrapper mbottom="1">
        <Link to="/">
          <H5 color={styledTheme.warning} lgFontSize={styledTheme.bodyBig}>
            ThreeSixtyTrailers
          </H5>
        </Link>
      </Wrapper>
      <H3>Log In</H3>
      <Wrapper width={md} align="center" mtop="2">
        <form style={{ width: '400px' }} onSubmit={formSubmit}>
          <Wrapper
            justify="space-between"
            align="left"
            direction="column"
            mbottom="0.25"
          >
            <label style={label}>Email</label>
            <div>
              <input
                type="email"
                name="email"
                placeholder="worldpe4ce@me.com"
                style={input}
                value={userSignUp.email}
                onChange={handleChange}
              />
            </div>
          </Wrapper>
          <Wrapper
            justify="space-between"
            align="left"
            direction="column"
            mbottom="0.25"
          >
            <label style={label}>Password</label>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                style={input}
                value={userSignUp.password}
                onChange={handleChange}
              />
            </div>
          </Wrapper>

          {/* Error alerts */}
          {passError && (
            <Wrapper mtop="1">
              <Alert error>{passError}</Alert>
            </Wrapper>
          )}
          <Wrapper mtop="2">
            <Button type="submit" disabled={loading}>
              Login
            </Button>
            <Wrapper mtop="1" align="left" hover>
              <Link to="/signup">
                Dont already have an account sign up here
              </Link>
            </Wrapper>
          </Wrapper>
        </form>
      </Wrapper>
    </Wrapper>
  );
};

export default SignIn;
