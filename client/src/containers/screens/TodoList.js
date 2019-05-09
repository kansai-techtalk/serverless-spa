import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import {
  Typography, Button, List,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { getAllTodo, updateTodo, deleteTodo } from '../../actions';
import Todo from '../../components/Todo';

const styles = theme => ({
  container: {
    width: '100%',
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  spacer: {
    flex: 1,
  },
});

class TodoList extends Component {
  componentWillMount() {
    this.initialize();
  }

  componentWillReceiveProps(nextProps) {
    const {
      location: currentLocation,
    } = this.props;

    const {
      location: nextLocation,
    } = nextProps;

    if (currentLocation !== nextLocation) {
      this.initialize();
    }
  }

  /**
   * 初期化処理
   */
  initialize = () => {
    const {
      getTodo,
    } = this.props;

    getTodo();
  };

  render() {
    const {
      classes,
      todo: {
        list,
      },
      update,
      remove,
    } = this.props;

    return (
      <div className={classes.container}>
        <header className={classes.header}>
          <Typography variant="title">
            TodoList
          </Typography>
          <div className={classes.spacer} />
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/edit"
          >
            Create
          </Button>
        </header>
        <List className={classes.list}>
          {list && list.map(todo => (
            <Todo
              key={todo.ID}
              {...todo}
              onUpdate={update}
              onDelete={remove}
            />
          ))}
        </List>
      </div>
    );
  }
}

TodoList.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // react-router
  location: PropTypes.shape().isRequired,
  // redux
  todo: PropTypes.shape().isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todo: state.todo,
});

const mapDispatchToProps = dispatch => ({
  getTodo: () => dispatch(getAllTodo()),
  update: payload => dispatch(updateTodo(payload)),
  remove: payload => dispatch(deleteTodo(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(TodoList)
  )
);
