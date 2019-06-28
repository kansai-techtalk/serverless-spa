import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import Todo from './components/Todo';

import './App.css';

Amplify.configure({
  Auth: {
    identityPoolId: 'ap-northeast-1:7a1e09c7-282a-44a3-be49-bac7933106f9',
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_KpjCfGb4O',
    userPoolWebClientId: '7nocohtf7auj70j7dumuqdpj3o',
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: 'https://lno4em2lgd.execute-api.ap-northeast-1.amazonaws.com/latest',
        region: 'ap-northeast-1',
      }
    ]
  }
});

class App extends Component {
  state = {
    todos: [],
    Content: '',
  };

  componentDidMount() {
    this.getTodoAsync().then((res) => {
      console.log(res);
    }).catch (error => {
      console.log(error);
    });
  }

  /**
   * 取得処理
   */
  getTodoAsync = async () => {
    try {
      const res = await API.get('api', '/todo');
      console.log(res);

      this.setState({
        todos: [...res.sort((a, b) => a.CreatedAt < b.CreatedAt ? 1 : -1)],
      });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 登録処理
   */
  createTodoAsync = async (body) => {
    try {
      // 登録処理
      const res = await API.post('api', '/todo', { body });
      console.log(res);

      // 取得処理
      await this.getTodoAsync();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 更新処理
   */
  updateTodoAsync = async (body) => {
    try {
      // 更新処理
      const path = `/todo/${body.ID}`;
      const res = await API.put('api', path, { body });
      console.log(res);

      // 取得処理
      await this.getTodoAsync();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 削除処理
   */
  deleteTodoAsync = async (ID) => {
    try {
      // 削除処理
      const path = `/todo/${ID}`;
      const res = await API.del('api', path);
      console.log(res);

      // 取得処理
      await this.getTodoAsync();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 編集
   */
  handleEdit = (id) => {
    const { todos } = this.state;

    const newTodos = todos.map((item) => {
      item.edit = item.ID === id;
      return item;
    });

    this.setState({
      todos: newTodos,
    });
  };

  /**
   * テキストエリア変更
   */
  handleChenge = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * 追加
   */
  handleClickAdd = () => {
    const { Content } = this.state;
    if (Content) {
      this.createTodoAsync({ Content, Done: false }).then(() => {
        this.setState({
          Content: '',
        });
      });
    }
  };

  /**
   * 更新
   */
  handleUpdate = (params) => {
    this.updateTodoAsync(params);
  };

  /**
   * 削除
   */
  handleDelete = (ID) => {
    this.deleteTodoAsync(ID);
  };

  /**
   * テキストエリアのクリア
   */
  handleClickClear = () => {
    this.setState({
      Content: '',
    });
  };

  render() {
    const { todos, Content } = this.state;

    return (
      <div className="App">
        <div className="form">
          {/* 新規登録フォーム */}
          <textarea
            name="Content"
            className="text"
            value={Content}
            onChange={this.handleChenge}
          />
          <div className="actions">
            <button
              type="button"
              disabled={!Content}
              onClick={this.handleClickAdd}
            >
              登録
            </button>
            <button
              type="button"
              onClick={this.handleClickClear}
            >
              クリア
            </button>
          </div>
        </div>
        {/* Todoのリスト */}
        {todos && todos.map((todo) => (
          <Todo
            key={todo.ID}
            onEdit={this.handleEdit}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            {...todo}
          />
        ))}
      </div>
    );
  }
}

export default withAuthenticator(App, true);
