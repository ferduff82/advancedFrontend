
import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import DBConnection from '../../../../../config/DBConnection';
 
class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      routeCords: [],
      breadCrumbs: [],
      bounds: {},
      directions: {},
      activeMarker: {},
      selectedPlace: {},
      firstMarkerState: {},
      secondMarkerState: {}
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  componentDidMount() {

    const self = this;

    /* Get inital coords when ready */

    const routeCords = [
      { lat: parseFloat( self.props.dataTrip.request.geo_inicio.lat ), lng: parseFloat( self.props.dataTrip.request.geo_inicio.lon )},
      { lat: parseFloat( self.props.dataTrip.request.geo_fin.lat ), lng: parseFloat( self.props.dataTrip.request.geo_fin.lon )}
    ];
    
    let bounds = new self.props.google.maps.LatLngBounds();
    for (let i = 0; i < routeCords.length; i++) {
      bounds.extend(routeCords[i]);
    }

    /* Directions */

    const DirectionsService = new window.google.maps.DirectionsService();

    DirectionsService.route({
      origin: new window.google.maps.LatLng(routeCords[0].lat, routeCords[0].lng),
      destination: new window.google.maps.LatLng(routeCords[1].lat, routeCords[1].lng),
      travelMode: window.google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
      provideRouteAlternatives : true
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        const overViewCoords = result.routes[0].overview_path; 

        console.log(result);
        
        var test = result.routes[0].legs[0];

        console.log(test.duration.text + ' (' + test.distance.text + ')');

        self.setState({
          routeCords: overViewCoords,
          firstMarkerState: { lat: parseFloat( self.props.dataTrip.request.geo_inicio.lat ), lng: parseFloat( self.props.dataTrip.request.geo_inicio.lon )},
          secondMarkerState: { lat: parseFloat( self.props.dataTrip.request.geo_fin.lat ), lng: parseFloat( self.props.dataTrip.request.geo_fin.lon )},
          bounds: bounds
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });

  }

  render() {
    return (
      <Map google={this.props.google} bounds={this.state.bounds} onClick={this.onMapClicked}>
        <Polyline
          path={this.state.routeCords}
          strokeColor="#42a5f5"
          icon="lineSymbol"
          strokeOpacity={0.8}
          strokeWeight={4} />
        <Marker
          name={'Origen'}
          position={this.state.firstMarkerState} 
          onClick={this.onMarkerClick}/>
        <Marker
          name={'Destino'}
          position={this.state.secondMarkerState} 
          onClick={this.onMarkerClick}/>
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBexD8Iv8DROSjaOTKMetx6zOrJHIscsTw')
})(MapContainer)
