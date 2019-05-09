import { fork, put, call, select, take, takeLatest } from 'redux-saga/effects';
import PathParser from 'path-parser';
import {
  INDICATOR_START, INDICATOR_STOP,
  TODO_GET_ALL,
  TODO_GET_ONE,
  TODO_CREATE, TODO_CREATE_SUCCEEDED, TODO_CREATE_FAILED,
  TODO_UPDATE, TODO_UPDATE_SUCCEEDED, TODO_UPDATE_FAILED,
  TODO_DELETE, TODO_DELETE_SUCCEEDED, TODO_DELETE_FAILED,
  SIGN_OUT,
} from '../actions';

/**
 * fetchのラッパー
 * @param {string} url
 * @param {object} params
 */
async function fetchAsync(url, params) {
  const res = await fetch(url, params);

  const headers = {};
  for (const pair of res.headers.entries()) {
    headers[pair[0]] = pair[1];
  }

  if (res.ok) {
    // bodyが空っぽかどうかを一旦テキストに変換して確認
    const tmp = res.clone();
    const text = await res.text();

    if (text) {
      const data = await tmp.json();
      return {
        data: JSON.parse(JSON.stringify(data)),
        headers,
      };
    }

    // bodyが空ならヘッダーだけ返す
    return { headers };
  }

  // error
  const err = new Error(`${res.status} ${res.statusText}`);
  throw err;
}

/**
 * fetch
 * @param {string} actionType
 * @param {object} param
 * @param {string} param.api
 * @param {string} [param.method]
 * @param {object} [param.payload]
 * @param {boolean} [showIndicator]
 */
function* handleFetch(
  actionType,
  {
    api,
    method = 'GET',
    payload = null,
  },
  showIndicator = true,
) {
  try {
    if (showIndicator) {
      yield put({ type: INDICATOR_START });
    }

    // ヘッダーの設定
    const headers = {
      'Content-Type': 'application/json',
    };

    // URL組み立て
    let url = new URL(`${process.env.REACT_APP_API_URL}${api}`);
    // fetchのパラメータ設定
    const params = {
      method,
      headers,
      mode: 'cors',
    };

    if (payload) {
      // payloadの値をescapeする
      const p = Object.assign({}, payload);
      Object.keys(p).forEach((key) => {
        p[key] = encodeURIComponent(p[key]);
      });

      // pathパラメータをpayloadで指定された値に置き換える
      const path = new PathParser(api);
      const raw = path.build(p);

      // URLのインスタンス再生成
      url = new URL(`${process.env.REACT_APP_API_URL}${raw}`);

      if (method === 'GET') {
        // QueryStringの組み立て
        const qs = Object.assign({}, payload);
        // QueryStringからPathパラメータを削除
        const prms = path.test(raw);
        Object.keys(prms).forEach((key) => {
          delete qs[key];
        });

        // QueryStringをURLに設定
        Object.keys(qs).forEach((key) => {
          url.searchParams.append(key, qs[key]);
        });
      } else if (['POST', 'PUT'].includes(method)) {
        // Bodyの設定
        if (typeof payload === 'string') {
          params.body = payload;
        } else {
          params.body = JSON.stringify(payload);
        }
      }
    }

    // fetch実行
    const res = yield call(fetchAsync, url, params);

    // 成功
    yield put({
      type: `${actionType}_SUCCEEDED`,
      payload: res,
    });

    return {
      error: null,
      data: res.data,
    };
  } catch (err) {
    // 失敗
    yield put({
      type: `${actionType}_FAILED`,
      payload: err,
    });

    // 401 Unauthorizedなら強制的にサインアウト
    if (err.message.indexOf('401') >= 0) {
      yield put({ type: SIGN_OUT });
    }

    return {
      error: err,
      data: null,
    };
  } finally {
    if (showIndicator) {
      yield put({ type: INDICATOR_STOP });
    }
  }
}

/**
 * 全件取得
 * @param {string} action.type
 * @param {object} action.payload
 */
function* listTodoRequest(action) {
  const { type, payload } = action;

  // パラメータ組み立て
  const params = {
    api: '/todo',
    method: 'GET',
    payload,
  };

  // WebAPIリクエスト
  yield fork(handleFetch, type, params);
}

function* listTodo() {
  yield takeLatest(TODO_GET_ALL, listTodoRequest);
}

/**
 * 1件取得
 * @param {string} action.type
 * @param {object} action.payload
 */
function* getTodoRequest(action) {
  const { type, payload } = action;

  // パラメータ組み立て
  const params = {
    api: '/todo/:ID',
    method: 'GET',
    payload,
  };

  // WebAPIリクエスト
  yield fork(handleFetch, type, params);
}

function* getTodo() {
  yield takeLatest(TODO_GET_ONE, getTodoRequest);
}

/**
 * 作成
 * @param {object} context
 * @param {object} action
 */
function* createTodoRequest(context, action) {
  const { type, payload } = action;

  // パラメータ組み立て
  const params = {
    api: '/todo',
    method: 'POST',
    payload,
  };

  // WebAPIリクエスト
  yield fork(handleFetch, type, params);
  // 完了を待つ
  yield take([TODO_CREATE_SUCCEEDED, TODO_CREATE_FAILED]);
  // データ取得
  const { data } = yield select(state => state.todo);

  // 成功時
  if (data) {
    // 画面遷移 - 更新画面に遷移
    yield call(context.history.push, `/edit/${data.id}`);
  }
}

function* createTodo(context) {
  yield takeLatest(TODO_CREATE, createTodoRequest, context);
}

/**
 * 更新
 * @param {object} action
 */
function* updateTodoRequest(action) {
  const { type, payload } = action;

  // パラメータ組み立て
  const params = {
    api: '/todo/:ID',
    method: 'PUT',
    payload,
  };

  // WebAPIリクエスト
  yield fork(handleFetch, type, params);
  // 完了を待つ
  yield take([TODO_UPDATE_SUCCEEDED, TODO_UPDATE_FAILED]);
  // データ取得
  const { data } = yield select(state => state.todo);

  // 成功時
  if (data) {
    // リスト再取得
    yield put({ type: TODO_GET_ALL });
  }
}

function* updateTodo() {
  yield takeLatest(TODO_UPDATE, updateTodoRequest);
}

/**
 * 削除
 * @param {object} context
 * @param {object} action
 */
function* deleteTodoRequest(context, action) {
  const { type, payload } = action;

  // パラメータ組み立て
  const params = {
    api: '/todo/:ID',
    method: 'DELETE',
    payload,
  };

  // WebAPIリクエスト
  yield fork(handleFetch, type, params);
  // 完了を待つ
  yield take([TODO_DELETE_SUCCEEDED, TODO_DELETE_FAILED]);
  // データ取得
  const { error } = yield select(state => state.todo);

  // 成功時
  if (!error) {
    // 画面遷移 - リストに戻る
    yield call(context.history.push, '/');
  }
}

function* deleteTodo(context) {
  yield takeLatest(TODO_DELETE, deleteTodoRequest, context);
}

export default [
  listTodo,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
];
