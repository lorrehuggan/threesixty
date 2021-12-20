import React, { useState, useEffect } from 'react';
import { Wrapper, H3, Alert, Button, H5 } from '../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../styles/Mixins';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../utils/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import { Link, useHistory } from 'react-router-dom';
import { emailCheck, passwordCheck, usernameCheck } from '../utils/regex';

const SignUp = () => {
  const [userSignUp, setUserSignUp] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [passError, setPassError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { xl, lg, md } = breakpoints;
  const { register, currentUser } = useAuth();
  const collectionRef = collection(db, 'users');
  const history = useHistory();

  useEffect(() => {}, []);

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
    if (
      !userSignUp.name ||
      !userSignUp.email ||
      !userSignUp.password ||
      !userSignUp.passwordConfirm
    ) {
      return setPassError('Credentials not valid');
    }
    if (!usernameCheck.test(userSignUp.name)) {
      return setPassError(
        'Username not valid, must be at least 3 letters long'
      );
    }
    if (!emailCheck.test(userSignUp.email)) {
      return setPassError('Email not valid');
    }
    if (!passwordCheck.test(userSignUp.password)) {
      return setPassError(
        'Password not valid. Min eight characters, at least one upper case, one lower case, one number and one special character'
      );
    }
    if (userSignUp.password !== userSignUp.passwordConfirm) {
      return setPassError('Passwords do not match');
    }
    setLoading(true);
    register(userSignUp.email, userSignUp.password)
      .then((res) => {
        // create new user in db and set collection title to user UID
        setDoc(doc(collectionRef, res.user.uid), {
          name: userSignUp.name,
          email: userSignUp.email,
          id: res.user.uid,
          liked_film: [],
        });
      })
      .catch((err) => {
        if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
          setPassError('Email already registered');
        } else {
          setPassError('Error');
        }
      })
      .finally(() => {
        setLoading(false);
        history.push('/');
      });
    setUserSignUp({
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
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
      lgWidth={lg}
      mdWidth="980"
      justify="center"
      style={page}
    >
      <Wrapper mbottom="1">
        <Link to="/">
          <H5 color={styledTheme.warning} lgFontSize={styledTheme.bodyBig}>
            ThreeSixtyTrailers
          </H5>
        </Link>
      </Wrapper>
      <H3>Sign Up</H3>
      <Wrapper width="300" align="left" mtop="2">
        <form style={{ width: '100%' }} onSubmit={formSubmit}>
          <Wrapper
            justify="space-between"
            align="left"
            direction="column"
            mbottom="0.25"
          >
            <label style={label}>Name</label>
            <div>
              <input
                type="text"
                name="name"
                placeholder="MettaWorld"
                style={input}
                value={userSignUp.name}
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
          <Wrapper justify="space-between" align="left" direction="column">
            <label style={label}>Password Confirm</label>
            <div>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Re-type Passwrod"
                style={input}
                value={userSignUp.passwordConfirm}
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
              Sign Up
            </Button>
            <Wrapper mtop="1" align="left" hover>
              <Link to="/login">Already have an account log-in here</Link>
            </Wrapper>
          </Wrapper>
        </form>
      </Wrapper>
    </Wrapper>
  );
};

export default SignUp;
