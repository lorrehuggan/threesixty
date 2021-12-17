export const initialState = {
  user: null,
};

export const types = {
  SET_USER: 'SET_USER',
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
