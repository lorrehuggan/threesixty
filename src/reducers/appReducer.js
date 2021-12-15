export const initialState = {
  user: null,
  signUp: null,
};

export const types = {
  SET_USER: 'SET_USER',
  SET_SIGN_UP: 'SET_SIGN_UP',
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default appReducer;
