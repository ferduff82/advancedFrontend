
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../styles/GeneralComponents/overlay.css';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});
//<CircularProgress className={classes.progress} />
function LoaderOverlay(props) {
  const { classes } = props;
  return (
    <div className="overlay-loader" >
      <CircularProgress className='roll-overlay' />
    </div>
  );
}

LoaderOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoaderOverlay);
