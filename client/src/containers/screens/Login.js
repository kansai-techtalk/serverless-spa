import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import {
  CssBaseline, Paper, TextField,
  FormControl, FormControlLabel, Switch,
  Button, withStyles,
} from '@material-ui/core';
import { signIn } from '../../actions';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  state = {
    username: '',
    password: '',
    save: false,
  };

  blocked = false;

  /**
   * テキストボックス変更
   */
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  /**
   * Switchの操作
   */
  handleSwitch = (e) => {
    const { checked } = e.target;
    this.setState({
      save: checked,
    });
  };

  /**
   * サインイン処理
   */
  handleSignIn = (e) => {
    e.preventDefault();

    // 連打防止
    if (this.blocked) {
      return;
    }
    this.blocked = true;

    const { signIn } = this.props;

    // サインイン処理
    signIn({ ...this.state });

    this.blocked = false;
  };

  render() {
    const {
      classes,
      authenticate: {
        loggedIn,
      },
      location: {
        search,
      },
    } = this.props;

    const {
      username,
      password,
      save,
    } = this.state;

    // 認証済みなら画面遷移
    if (loggedIn) {
      let path = '/';
      if (search) {
        const { ref } = QueryString.parse(search);
        if (ref) {
          path = decodeURIComponent(ref);
        }
      }

      return (<Redirect to={path} />);
    }

    // ログイン画面の表示
    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <form
              className={classes.form}
              autoComplete="off"
              onSubmit={this.handleSignIn}
            >
              {/* ユーザー名 */}
              <TextField
                id="username"
                name="username"
                label="UserName"
                value={username}
                margin="normal"
                required
                fullWidth
                onChange={this.handleChange}
              />
              {/* パスワード */}
              <TextField
                type="password"
                id="password"
                name="password"
                label="Password"
                value={password}
                margin="normal"
                required
                fullWidth
                onChange={this.handleChange}
              />
              {/* ログイン状態を保持する */}
              <FormControl
                margin="normal"
                fullWidth
              >
                <FormControlLabel
                  control={(
                    <Switch
                      checked={save}
                      onChange={this.handleSwitch}
                    />
                  )}
                  label="ログイン状態を保持する"
                />
              </FormControl>
              {/* ログインボタン */}
              <Button
                type="submit"
                className={classes.submit}
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

Login.propTypes = {
  // material-ui
  classes: PropTypes.shape().isRequired,
  // react-router
  location: PropTypes.shape().isRequired,
  // redux
  authenticate: PropTypes.shape().isRequired,
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticate: state.authenticate,
});

const mapDispatchToProps = dispatch => ({
  signIn: payload => dispatch(signIn(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Login)
  )
);
