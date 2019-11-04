import MapConnection from "./mapConnection";
import React from "react";


const MapContainer = () => {
  return (
    <div style={{width:'100%',height:'100%'}}>
      <MapConnection
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDg772LiSGWJyBw2J7RSda5tnV3c4jg6cM&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: '100%',width: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{  lat: -34.6323651, lng: -58.38965200000001 }}
        zoom={6}
      >
      </MapConnection>
      
    </div>
  );
};

export default MapContainer;