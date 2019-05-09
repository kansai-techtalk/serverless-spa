import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { CircularProgress } from '@material-ui/core';

const styles = theme => ({
  bgLayer: {
    // https://material-ui.com/customization/default-theme/
    // https://material-ui.com/layout/basics/#z-index
    zIndex: theme.zIndex.snackbar - 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Indicator extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // リサイズフラグ
  resizing = false;

  componentDidMount() {
    // イベントハンドラの設定
    window.addEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    const {
      screen: {
        open: nextOpen,
      },
    } = nextProps;

    const {
      screen: {
        open: currentOpen,
      },
    } = this.props;

    if (currentOpen !== nextOpen && nextOpen) {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }

  componentWillUnmount() {
    // イベントハンドラの削除
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * windowのresizeイベント
   */
  handleResize = () => {
    // resizeやscrollイベントは普通に取得すると高頻度で発生してしまうので
    // requestAnimationFrameで最適化する
    // => scroll - Event reference | MDN
    //    https://developer.mozilla.org/ja/docs/Web/Events/scroll
    if (!this.resizing) {
      window.requestAnimationFrame(() => {
        const {
          screen: {
            open,
          },
        } = this.props;

        if (open) {
          this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }

        this.resizing = false;
      });

      this.resizing = true;
    }
  };

  render() {
    const {
      classes,
      screen: {
        open
      },
    } = this.props;

    const {
      width,
      height,
    } = this.state;

    return (
      <Fragment>
        {open && (
          <div
            className={classes.bgLayer}
            style={{
              width,
              height,
            }}
          >
            <CircularProgress />
          </div>
        )}
      </Fragment>
    );
  }
}

Indicator.propTypes = {
  classes: PropTypes.shape().isRequired,
  screen: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  screen: state.screen,
});

export default connect(mapStateToProps)(withStyles(styles)(Indicator));
