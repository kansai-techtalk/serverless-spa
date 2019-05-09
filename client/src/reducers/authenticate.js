import {
  SIGN_IN,
  SIGN_OUT,
} from '../actions';

const initialState = {
  loggedIn: false,
};

const authenticate = (state = initialState, action) => {
  const { type } = action;

  switch(type) {
    case SIGN_IN:
      return {
        loggedIn: true,
      };
    case SIGN_OUT:
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default authenticate;
