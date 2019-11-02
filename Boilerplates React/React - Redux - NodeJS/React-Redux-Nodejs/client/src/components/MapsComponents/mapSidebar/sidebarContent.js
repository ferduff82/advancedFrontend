import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../../../styles/MapComponents/mapSidebar.css';
import Divider from '@material-ui/core/Divider';
class SidebarContent extends Component {
    
  render() {
    const array_propiedades = Object.keys(this.props.marker_selected);
    //console.log(array_propiedades);
    return (<div className='sidebar-content'>
              
              {array_propiedades.map((propiedad)=> {
                  return (
                    <div>
                    <p>{`${propiedad} : ${this.props.marker_selected[propiedad]}`}</p>
                    <Divider />
                    </div>
                  );
                })
              }
              <p>{this.props.marker_selected.fullname}</p>
              <Divider />
            </div>)
  }
}

const mapStateToProps = (state) => {
  return {
      marker_selected: state.mapReducers.marker_selected,
  }
}

export default connect(mapStateToProps)(SidebarContent);
