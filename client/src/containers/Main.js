import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route, Switch, NavLink,
  withRouter,
} from 'react-router-dom';
import {
  AppBar, Toolbar, Typography,
  CssBaseline, Button,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { AccountCircle } from '@material-ui/icons';
import TodoList from './screens/TodoList';
import TodoEdit from './screens/TodoEdit';
import Indicator from '../components/Indicator';
import { signOut, redirectScreenFinished } from '../actions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
  },
  title: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: theme.spacing.unit * 2,
    overflow: 'auto',
  },
});

class Main extends Component {
  // 連打防止フラグ
  blocked = false;

  componentWillReceiveProps(nextProps) {
    const {
      screen: {
        redirectRequesting: currentRequesting,
      },
    } = this.props;
    const {
      history,
      screen: {
        redirectRequesting: nextRequesting,
        redirectPath: nextRedirectPath,
      },
      finishRedirect,
    } = nextProps;

    if (!currentRequesting && nextRequesting) {
      // currentRequesting = false, nextRequesting = true
      // -> redirect要求が投げられた
      finishRedirect();
      history.push(nextRedirectPath);
    }
  }

  shouldComponentUpdate() {
    const {
      screen: {
        redirectRequesting,
      },
    } = this.props;

    // redirect中は描画しない
    if (redirectRequesting) {
      return false;
    }

    return true;
  }

  /**
   * サインアウト処理
   */
  handleSignOut = () => {
    if (this.blocked) {
      return;
    }
    this.blocked = true;

    const { signOut } = this.props;
    signOut();

    this.blocked = false;
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          {/* ヘッダー */}
          <AppBar
            position="absolute"
            color="default"
          >
            <Toolbar>
              <Typography
                className={classes.title}
                variant="title"
                color="inherit"
                component={NavLink}
                to="/"
              >
                Todo
              </Typography>
              <div className={classes.nav}>
                <Button
                  color="inherit"
                  onClick={this.handleSignOut}
                >
                  <AccountCircle />
                  Sign Out
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <div className={classes.appBarSpacer} />
          <div className={classes.content}>
            <Switch>
              <Route exact path="/" component={TodoList} />
              <Route exact path="/create" component={TodoEdit} />
              <Route path="/edit/:id" component={TodoEdit} />
            </Switch>
          </div>
          {/* インジケーター */}
          <Indicator />
        </div>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  // redux
  screen: PropTypes.shape().isRequired,
  signOut: PropTypes.func.isRequired,
  finishRedirect: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  screen: state.screen,
});
const mapDispatchToProps = dispatch => ({
  signOut: payload => dispatch(signOut(payload)),
  finishRedirect: () => dispatch(redirectScreenFinished()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main))
);
