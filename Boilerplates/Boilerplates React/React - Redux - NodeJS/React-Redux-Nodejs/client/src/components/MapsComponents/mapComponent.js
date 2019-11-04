import React, { PureComponent }  from "react";
import { GoogleMap } from "react-google-maps";
import CLUSTER_STYLES from './clusterStyles';
import Markers from './Marker/Marker';

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const MapStyles = require("./mapStyles.json");

class Map extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <GoogleMap defaultZoom={this.props.zoom} defaultCenter={this.props.center}
        defaultOptions={{ styles: MapStyles,
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: true,
          rotateControl: false,
          fullscreenControl: false }} >
            <MarkerClusterer
                averageCenter
                enableRetinaIcons
                gridSize={60}
                styles = {CLUSTER_STYLES.ICON_STYLES}>
                <Markers />    
            </MarkerClusterer>
           
        </GoogleMap>
      );
    }
}

export default Map;