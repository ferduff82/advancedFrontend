
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

function TimePickers(props) {
  const { classes } = props;

  function _onChange(e) {
    var getValue = e.target.value;
    props.triggerHourChange(getValue);
  }

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        type="time"
        onChange={(e) => _onChange(e)}
        value={props.dataTime}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300
        }}
      />
    </form>
  );
}

TimePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimePickers);
