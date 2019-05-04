import * as actions from '../actions';

const initialState = {
  data: null, // APIから受け取ったデータ (ひとつ)
  list: null, // APIから受け取ったデータ (リスト)
  error: null, // APIから受け取ったエラー
};

export default function todo(state = initialState, action) {
  switch(action.type) {
    case actions.TODO_GET_ONE_SUCCEEDED:
      return {
        ...state,
        data: action.payload.data,
        error: null,
      };
    case actions.TODO_GET_ONE_FAILED:
      return {
        ...state,
        data: action.payload.data,
        error: null,
      };
    case actions.TODO_GET_ALL_SUCCEEDED:
      return {
        ...state,
        list: action.payload.data,
        error: null,
      };
    case actions.TODO_GET_ALL_FAILED:
      return {
        ...state,
        list: null,
        error: action.payload.error,
      };
    case actions.TODO_CREATE_SUCCEEDED:
      return {
        ...state,
        data: action.payload.data,
        error: null,
      };
    case actions.TODO_CREATE_FAILED:
      return {
        ...state,
        data: action.payload.data,
        error: null,
      };
    case actions.TODO_UPDATE_SUCCEEDED:
      return {
        ...state,
        data: action.payload.data,
        error: null,
      };
    case actions.TODO_UPDATE_FAILED:
      return {
        ...state,
        data: action.payload.data,
        error: null,
      };
    case actions.TODO_DELETE_SUCCEEDED:
      return {
        ...state,
        error: null,
      };
    case actions.TODO_DELETE_FAILED:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
