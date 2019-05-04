import {
  API_REQUESTED,
  API_SUCCEEDED,
  API_FAILED,
} from '../actions';

const initialState = {
  requesting: false, // APIリクエスト中？
  error: null,
};

export default function api(state = initialState, action) {
  switch(action.type) {
    case API_REQUESTED:
      return {
        ...state,
        requesting: true,
        error: null,
      };
    case API_SUCCEEDED:
      return {
        ...state,
        requesting: false,
        error: null,
      };
    case API_FAILED:
      return {
        ...state,
        requesting: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
