import {
  INDICATOR_START,
  INDICATOR_STOP,
} from '../actions';

const initialState = {
  open: false,
};

const screen = (state = initialState, action) => {
  const { type } = action;

  switch(type) {
    case INDICATOR_START:
      return {
        open: true,
      };
    case INDICATOR_STOP:
      return {
        open: false,
      };
    default:
      return state;
  }
};

export default screen;
