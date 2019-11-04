
import isMobile from '../../../config/isMobile'
import isTablet from '../../../config/isTablet'

export let drawerWidth = isMobile || isTablet ? '97%' : 400;
export const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width:'60px',
      height:'60px',
      position:'absolute',
      background:'#1976d2',
      color:'#fff',
      left:'0px',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: '1s',
        duration: '1s',
      }),
    },
    appBarShift: {
      width: `0px`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: '1s',
        duration: '1s',
      }),
      border: 0
    },
    menuButton: {
      margin: 6,
      position:'relative',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      height: '97%',
      flexShrink: 0,
      border: 0
    },
    drawerPaper: {
      width: drawerWidth,
      border: 0
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
      textAlign:'center',
      color:'#fff',
      background:'#1976d2',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  });
