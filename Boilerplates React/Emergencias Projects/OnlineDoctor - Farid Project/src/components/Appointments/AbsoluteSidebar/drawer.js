import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SidebarHeader from './sidebarHeader';
import { styles } from './drawerTheme';
import { connect } from 'react-redux';
import { sidebarFirstOpen, sidebarSecOpen, sidebarFirstClose, sidebarSecClose } from '../../../store/actions/frontActions';

class AbsoluteSidebar extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    if (this.props.sidebar === "first") {
      this.props.sidebarFirstOpen();
    } else {
      this.props.sidebarSecOpen();
    }
  };

  handleDrawerClose = () => {
    if(this.props.sidebar === "first") {
      this.props.sidebarFirstClose()
    } else {
      this.props.sidebarSecClose()
    }
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.props.sidebar,
          })}
        >
          <Toolbar disableGutters={!this.props.sidebar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.props.sidebar && classes.hide)}
              style={{ outline: 0 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          className={classes.drawer}
          anchor="left"
          onClose={this.handleDrawerClose}
          onOpen={this.handleDrawerOpen}
          open={this.props.secondSidebar || this.props.firstSidebar}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>

            <SidebarHeader></SidebarHeader>
            <IconButton style={{ color: '#fff', fontWeight: 'bolder', outline: 0 }} onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          {this.props.children}
        </SwipeableDrawer>
      </div>
    );
  }
}

AbsoluteSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    firstSidebar: state.front.sidebar.first,
    secondSidebar: state.front.sidebar.second,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    sidebarFirstOpen: () => { dispatch(sidebarFirstOpen()) },
    sidebarFirstClose: () => { dispatch(sidebarFirstClose()) },
    sidebarSecOpen: () => { dispatch(sidebarSecOpen()) },
    sidebarSecClose: () => { dispatch(sidebarSecClose()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(AbsoluteSidebar));
