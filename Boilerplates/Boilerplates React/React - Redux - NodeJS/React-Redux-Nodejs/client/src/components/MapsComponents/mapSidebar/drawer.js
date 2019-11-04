import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SidebarContent from './sidebarContent';
import SidebarHeader from './sidebarHeader';
import { styles } from './drawerTheme';
import { connect } from 'react-redux';
import { sidebarClose, sidebarOpen } from '../../../store/actions/mapActions';

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.props.sidebarOpen();
  };

  handleDrawerClose = () => {
    this.props.sidebarClose();
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.props.sidebar.open,
          })}
        >
        
          <Toolbar disableGutters={!this.props.sidebar.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.props.sidebar.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
           
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.props.sidebar.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
           <SidebarHeader></SidebarHeader>
           <IconButton style={{color:'#6c6c6d',fontWeight:'bolder'}} onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <SidebarContent></SidebarContent>
        </Drawer>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
      sidebar: state.mapReducers.sidebar,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    sidebarOpen: () => { dispatch(sidebarOpen()) },
    sidebarClose: () => { dispatch(sidebarClose()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PersistentDrawerLeft));
