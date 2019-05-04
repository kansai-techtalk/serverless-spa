// TODO API
// get one
export const TODO_GET_ONE = 'TODO_GET_ONE';
export const TODO_GET_ONE_SUCCEEDED = 'TODO_GET_ONE_SUCCEEDED';
export const TODO_GET_ONE_FAILED = 'TODO_GET_ONE_FAILED';
// get all
export const TODO_GET_ALL = 'TODO_GET_ALL';
export const TODO_GET_ALL_SUCCEEDED = 'TODO_GET_ALL_SUCCEEDED';
export const TODO_GET_ALL_FAILED = 'TODO_GET_ALL_FAILED';
// create
export const TODO_CREATE = 'TODO_CREATE';
export const TODO_CREATE_SUCCEEDED = 'TODO_CREATE_SUCCEEDED';
export const TODO_CREATE_FAILED = 'TODO_CREATE_FAILED';
// update
export const TODO_UPDATE = 'TODO_UPDATE';
export const TODO_UPDATE_SUCCEEDED = 'TODO_UPDATE_SUCCEEDED';
export const TODO_UPDATE_FAILED = 'TODO_UPDATE_FAILED';
// delete
export const TODO_DELETE = 'TODO_DELETE';
export const TODO_DELETE_SUCCEEDED = 'TODO_DELETE_SUCCEEDED';
export const TODO_DELETE_FAILED = 'TODO_DELETE_FAILED';

// API共通
export const API_REQUESTED = 'API_REQUESTED';
export const API_SUCCEEDED = 'API_SUCCEEDED';
export const API_FAILED = 'API_FAILED';

// action creator

export const getOneTodo = payload => ({
  type: TODO_GET_ONE,
  payload,
});

export const getAllTodo = payload => ({
  type: TODO_GET_ALL,
  payload,
});

export const createTodo = payload => ({
  type: TODO_CREATE,
  payload,
});

export const updateTodo = payload => ({
  type: TODO_UPDATE,
  payload,
});

export const deleteTodo = payload => ({
  type: TODO_DELETE,
  payload,
});
