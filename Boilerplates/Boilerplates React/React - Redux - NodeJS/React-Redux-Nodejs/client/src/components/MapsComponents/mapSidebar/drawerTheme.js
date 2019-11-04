const drawerWidth = 240;
export const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      width:'60px',
      height:'60px',
      position:'absolute',
      background:'#eeeeee',
      color:'#6c6c6d',
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
      position:'relative'
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      border:0
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
      color:'#6c6c6d',
      background:'#eeeeee',
      boxShadow: '1px 3px 8px rgba(86, 86, 86, 0.6509803921568628)'
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

  