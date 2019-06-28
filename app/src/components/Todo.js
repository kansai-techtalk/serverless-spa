import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Todo.css';

class Todo extends Component {
  state = {
    Content: '',
    Done: false,
  };

  componentWillMount() {
    const { Content, Done } = this.props;
    this.setState({
      Content,
      Done,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      Content,
      Done,
    } = nextProps;

    this.setState({
      Content,
      Done,
    });
  }

  /**
   * テキストエリアの変更
   */
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  /**
   * チェックボックスの変更
   */
  handleCheck = (e) => {
    const { name, checked } = e.target;
    const { ID, Content, onUpdate, edit } = this.props;

    if (edit) {
      // editモードの場合はstateを更新
      this.setState({ [name]: checked });
    } else {
      // editモードでなければ即時反映
      onUpdate({ ID, Content, Done: checked });
    }
  };

  /**
   * Editボタンのクリック
   */
  handleClickEdit = () => {
    const { ID, onEdit } = this.props;
    // Editモードに切り替え
    onEdit(ID);
  };

  /**
   * Deleteボタンのクリック
   */
  handleClickDelete = () => {
    const { ID, onDelete } = this.props;
    onDelete(ID);
  };

  /**
   * Cancelボタンのクリック
   */
  handleClickCancel = () => {
    const { onEdit } = this.props;
    // Editモードをキャンセル
    onEdit(false);
  };

  /**
   * OKボタンのクリック
   */
  handleClickOK = () => {
    const { ID, onUpdate } = this.props;
    const { Content, Done } = this.state;

    onUpdate({ ID, Content, Done });
  };

  render() {
    const {
      ID,
      CreatedAt,
      UpdatedAt,
      edit,
    } = this.props;

    const {
      Content,
      Done,
    } = this.state;

    return (
      <div className={classnames({
        Todo: true,
        Done,
        edit,
      })}>
        <label className="checkbox">
          <input
            type="checkbox"
            name="Done"
            checked={Done}
            onChange={this.handleCheck}
          />
          Done
        </label>
        <div className="main">
          <div className="header">
            <div className="id">{ID}</div>
            <div className="date">CreatedAt: {CreatedAt}</div>
            <div className="date">UpdatedAt: {UpdatedAt}</div>
          </div>
          {edit ? (
            <textarea
              className="content"
              name="Content"
              value={Content}
              onChange={this.handleChange}
            />
          ) : (
            <div className="content">{Content}</div>
          )}
        </div>
        <div className="actions">
          {edit ? (
            <Fragment>
              <button type="button" onClick={this.handleClickCancel}>Cancel</button>
              <button type="button" onClick={this.handleClickOK}>OK</button>
            </Fragment>
          ) : (
            <Fragment>
              <button type="button" onClick={this.handleClickEdit}>Edit</button>
              <button type="button" onClick={this.handleClickDelete}>Delete</button>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

Todo.defaultProps = {
  edit: false,
};

Todo.propTypes = {
  ID: PropTypes.string.isRequired,
  Content: PropTypes.string.isRequired,
  Done: PropTypes.bool.isRequired,
  CreatedAt: PropTypes.string.isRequired,
  UpdatedAt: PropTypes.string.isRequired,
  edit: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Todo;
