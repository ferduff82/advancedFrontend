import React, { Component } from 'react';
import MapContainer from './MapsComponents/mapContainer';
import MapSidebar from './MapsComponents/mapSidebar/mapSidebar';
class Maps extends Component {
  
  render() {
    const mapStyles = {height:'100%', width:'100%',position:'absolute',zIndex:'-1'};
    
    return (<div><MapSidebar /><div style={mapStyles}><MapContainer /></div></div>)
  }
}

export default Maps;
