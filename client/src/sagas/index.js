import { all } from 'redux-saga/effects';
import todo from './todo';

export default function* rootSaga(context) {
  yield all([
    ...todo,
  ].map(f => f(context)));
}
