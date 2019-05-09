import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * 認証Component
 */
class Auth extends Component {
  render() {
    const {
      authenticate: {
        loggedIn,
      },
      children,
      location: {
        pathname,
        search,
      },
    } = this.props;

    // 認証済み
    if (loggedIn) {
      // childrenを描画
      return children;
    }

    // 未認証
    // 現在のURLを取得
    const uri = `${pathname}${search}`;
    const ref = encodeURIComponent(uri);
    // /Loginに転送
    return (
      <Redirect to={`/login${ref ? `?ref=${ref}`: ''}`} />
    );
  }
}

Auth.propTypes = {
  // react-router
  location: PropTypes.shape().isRequired,
  // redux
  authenticate: PropTypes.shape().isRequired,
  // component props
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  authenticate: state.authenticate,
});

export default withRouter(connect(mapStateToProps)(Auth));
