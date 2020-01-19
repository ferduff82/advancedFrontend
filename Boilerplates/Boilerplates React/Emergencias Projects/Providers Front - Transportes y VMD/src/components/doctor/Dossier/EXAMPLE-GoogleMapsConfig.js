
import React from 'react';
import Moment from 'moment';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline, DirectionsRenderer } from 'google-maps-react';
import DBConnection from '../components/DBConnection';
 
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

    let dataLat = (self.props.destinationPosition.mr) ? self.props.destinationPosition.mr.geo.lat : 0,
        dataLon = (self.props.destinationPosition.mr) ? self.props.destinationPosition.mr.geo.lon : 0;

    /* Set Map State */

    const firestore = DBConnection.firestore(),
          query = firestore.collection('providers_auth').doc(self.props.destinationPosition.mr.provider.ws);

    query.onSnapshot(function(doc) {
      
      /* Determine Map Limits */

      console.log(doc.data().lat_gps);
      console.log(doc.data().lon_gps);

      const routeCords = [
        {lat: parseFloat( dataLat ), lng: parseFloat( dataLon )},
        {lat: parseFloat( doc.data().lat_gps ), lng: parseFloat( doc.data().lon_gps)}
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

          /*
          var getRequestDate = Moment(self.props.destinationPosition.mr.dts_preds.att).format(),
              addedTime = Moment(getRequestDate).add(23, 'minutes');

              console.log(getRequestDate);
              console.log(addedTime.format('MM DD YYYY, HH:MM:SS'));
          */


          console.log(test.duration.text + ' (' + test.distance.text + ')');

          self.setMinutesToLocation(test.duration.text);

          self.setState({
            routeCords: overViewCoords,
            firstMarkerState: {lat: dataLat, lng: dataLon},
            secondMarkerState: {lat: doc.data().lat_gps, lng: doc.data().lon_gps},
            bounds: bounds
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });

    });
  }

  setMinutesToLocation(timeToArrive) {
    this.props.resetArrivalTime(timeToArrive);
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
