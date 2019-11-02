import React, { Component } from 'react';
import '../../../styles/map/mapSidebar.scss';
import logo from '../../../assets/logo.png';

class SidebarHeader extends Component {
  render() {
    return (
    <div style={{width:'100%'}}>
      <div className='title-container'>
        <img className="sidebar-title" src={logo} alt="UMA" />
      </div> 
    </div>
    )
  }
}

export default SidebarHeader;