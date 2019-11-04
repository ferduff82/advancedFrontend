import React, { Component } from 'react';
import '../../../styles/MapComponents/mapSidebar.css';
import PersistentDrawerLeft from './drawer';

class MapSidebar extends Component {
  
  render() {
    return (<PersistentDrawerLeft className='sideBarStyles' />)
  }
}

export default MapSidebar;
