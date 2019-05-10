import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import {
  Typography, Button, Paper, TextField,
  FormControlLabel, Checkbox,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { getOneTodo, createTodo, updateTodo } from '../../actions';
import { toLocaleString } from '../../utils';

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
  content: {
    width: '100%',
    padding: theme.spacing.unit * 2,
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  spacer: {
    flex: 1,
  },
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 2,
  },
});

const defaultState = {
  isNew: true,
  ID: '',
  Content: '',
  Done: false,
  CreatedAt: '',
  UpdatedAt: '',
};

class TodoEdit extends Component {
  state = {
    ...defaultState,
  };

  // 連打防止
  blocked = false;

  componentDidMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const {
      location: currentLocation,
      todo: {
        data: currentTodo,
      },
    } = this.props;
    const {
      location: nextLocation,
      todo: {
        data: nextTodo,
      },
    } = nextProps;

    const {
      isNew,
      ID,
    } = this.state;

    if (currentLocation !== nextLocation) {
      this.initialize(nextProps);
    }

    if (!isNew) {
      const ct = JSON.stringify(currentTodo);
      const nt = JSON.stringify(nextTodo);
      if (nextTodo && (ID === '' || ct !== nt)) {
        this.setState({...nextTodo});
      }
    }
  }

  /**
   * 初期化
   */
  initialize = (props) => {
    const {
      match: { params: { id } },
      get,
    } = props;

    let isNew = true;
    if (id) {
      isNew = false;
      get({ ID: id });
    }

    this.setState({ isNew });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleChangeCheck = (e) => {
    const { name, checked } = e.target;
    this.setState({
      [name]: checked,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // 連打防止
    if (this.blocked) {
      return;
    }
    this.blocked = true;

    const {
      create,
      update,
    } = this.props;

    const {
      isNew,
      ID,
      Content,
      Done,
    } = this.state;

    if (isNew) {
      create({
        ID,
        Content,
      });
    } else {
      update({
        ID,
        Content,
        Done,
      });
    }

    this.blocked = false;
  };

  render() {
    const {
      classes,
    } = this.props;

    const {
      isNew,
      Content,
      Done,
      CreatedAt,
      UpdatedAt,
    } = this.state;

    return (
      <div className={classes.container}>
        <header className={classes.header}>
          <Typography variant="title">TodoEdit</Typography>
        </header>
        <Paper className={classes.content}>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            {/* Content */}
            <TextField
              id="Content"
              name="Content"
              label="Content"
              value={Content}
              margin="normal"
              required
              fullWidth
              onChange={this.handleChange}
            />
            {!isNew && (
              <React.Fragment>
                {/* Done */}
                <FormControlLabel
                  label="Done"
                  control={(
                    <Checkbox
                      id="Done"
                      name="Done"
                      checked={Done}
                      color="primary"
                      onChange={this.handleChangeCheck}
                    />
                  )}
                />
                {/* CreatedAt */}
                <TextField
                  label="CreatedAt"
                  value={toLocaleString(CreatedAt)}
                  margin="normal"
                  disabled
                  fullWidth
                />
                {/* UpdatedAt */}
                <TextField
                  label="UpdatedAt"
                  value={toLocaleString(UpdatedAt)}
                  margin="normal"
                  disabled
                  fullWidth
                />
              </React.Fragment>
            )}
            <footer className={classes.footer}>
              <div className={classes.spacer} />
              <Button
                component={Link}
                to="/"
              >
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {isNew ? 'Create' : 'Update'}
              </Button>
            </footer>
          </form>
        </Paper>
      </div>
    );
  }
}

TodoEdit.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // react-router
  location: PropTypes.shape().isRequired,
  // redux
  todo: PropTypes.shape().isRequired,
  get: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  todo: state.todo,
});

const mapDispatchToProps = dispatch => ({
  get: payload => dispatch(getOneTodo(payload)),
  create: payload => dispatch(createTodo(payload)),
  update: payload => dispatch(updateTodo(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(TodoEdit)
  )
);
