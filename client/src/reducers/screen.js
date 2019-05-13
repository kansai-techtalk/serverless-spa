import {
  INDICATOR_START,
  INDICATOR_STOP,
  REDIRECT_SCREEN_REQUEST,
  REDIRECT_SCREEN_FINISHED,
} from '../actions';

const initialState = {
  open: false,
  redirectRequesting: false,
  redirectPath: '',
};

const screen = (state = initialState, action) => {
  const {
    type,
    payload,
  } = action;

  switch(type) {
    case INDICATOR_START:
      return {
        ...state,
        open: true,
      };
    case INDICATOR_STOP:
      return {
        ...state,
        open: false,
      };
    case REDIRECT_SCREEN_REQUEST:
      let path = '/';
      if (payload) {
        path = payload.path;
      }
      return {
        ...state,
        redirectRequesting: true,
        redirectPath: path,
      };
    case REDIRECT_SCREEN_FINISHED:
      return {
        ...state,
        redirectRequesting: false,
        redirectPath: '',
      };
    default:
      return state;
  }
};

export default screen;
