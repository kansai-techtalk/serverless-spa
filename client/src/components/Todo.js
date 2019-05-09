import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import {
  ListItem, ListItemText, ListItemSecondaryAction,
  Checkbox, IconButton, Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';

const styles = theme => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing.unit / 2,
  },
  // 完了したやつの背景色を変える
  done: {
    backgroundColor: grey[100],
  },
});

class Todo extends Component {
  /**
   * 完了処理
   */
  handleDone = () => {
    const {
      ID,
      Content,
      Done,
      CreatedAt,
      UpdatedAt,
      onUpdate,
    } = this.props;

    onUpdate({
      ID,
      Content,
      CreatedAt,
      UpdatedAt,
      Done: !Done, // 完了フラグだけ反転
    });
  };

  /**
   * 削除処理
   */
  handleDelete = () => {
    const {
      ID,
      onDelete,
    } = this.props;

    onDelete({ ID });
  };

  render() {
    const {
      classes,
      ID,
      Content,
      Done,
      CreatedAt,
      UpdatedAt,
    } = this.props;

    return (
      <ListItem
        className={classnames({
          [classes.done]: Done,
        })}
        onClick={this.handleDone}
      >
        <Checkbox
          checked={Done}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText
          primary={Content}
          secondary={(
            <Typography>{CreatedAt} {UpdatedAt}</Typography>
          )}
        />
        <ListItemSecondaryAction>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={this.handleDelete}
          >
            <Delete />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Edit"
            component={Link}
            to={`/edit/${ID}`}
          >
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

Todo.propTypes = {
  classes: PropTypes.shape().isRequired,
  ID: PropTypes.string.isRequired,
  Content: PropTypes.string.isRequired,
  Done: PropTypes.bool.isRequired,
  CreatedAt: PropTypes.string.isRequired,
  UpdatedAt: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(Todo);
