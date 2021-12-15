import React, { useState } from 'react';
import { Wrapper, H3 } from '../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../styles/Mixins';
import { FaExclamation, FaCheck } from 'react-icons/fa';
import { useAppStateValue } from '../contexts/AppProvider';
import { types } from '../reducers/appReducer';

const SignUp = () => {
  const [{ user }, dispatch] = useAppStateValue();
  const [value, setValue] = useState({ name: '', email: '', password: '' });
  const { xl, lg } = breakpoints;

  //form styles
  const input = {
    height: '2rem',
    border: 'none',
    outline: 'none',
    padding: '0.25rem',
  };

  const label = {
    fontSize: '1.5rem',
  };
  //form handling
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Wrapper hidden width={xl} align="center" lgWidth={lg} mdWidth="980">
      <H3>Sign Up</H3>
      <Wrapper width={lg} align="center" mtop="2">
        <form style={{ width: '400px' }}>
          <Wrapper
            justify="space-between"
            align="center"
            direction="row"
            mbottom="0.25"
          >
            <label style={label}>Name</label>
            <div>
              <input
                type="text"
                name="name"
                placeholder="MettaWorld"
                style={input}
                value={value.name}
                onChange={handleChange}
              />
              <FaExclamation />
              <FaCheck />
            </div>
          </Wrapper>
          <Wrapper
            justify="space-between"
            align="center"
            direction="row"
            mbottom="0.25"
          >
            <label style={label}>Email</label>
            <div>
              <input
                type="email"
                name="email"
                placeholder="worldpe4ce@me.com"
                style={input}
                value={value.email}
                onChange={handleChange}
              />
              <FaExclamation />
              <FaCheck />
            </div>
          </Wrapper>
          <Wrapper justify="space-between" align="center" direction="row">
            <label style={label}>Password</label>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                style={input}
                value={value.password}
                onChange={handleChange}
              />
              <FaExclamation />
              <FaCheck />
            </div>
          </Wrapper>
          <Wrapper mtop="1">
            <button type="submit" onClick={formSubmit}>
              Submit
            </button>
          </Wrapper>
        </form>
      </Wrapper>
    </Wrapper>
  );
};

export default SignUp;
