
import React from 'react';
import DBConnection from '../components/DBConnection';
 
class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      urlIframe: ''
    };
  }

  componentDidMount() {
    const self = this;
    this.dataDestinationLat = (this.props.destinationPosition.mr) ? this.props.destinationPosition.mr.geo.lat : 0;
    this.dataDestinationLon = (this.props.destinationPosition.mr) ? this.props.destinationPosition.mr.geo.lon : 0;
    self.firebaseConnection();
  }

  firebaseConnection() {
    const that = this,
          firestore = DBConnection.firestore(),
          query = firestore.collection('providers_auth').doc(this.props.destinationPosition.mr.provider.ws);

    query.onSnapshot(function(doc) {
      that.setState({
        urlIframe: "https://www.google.com/maps/embed/v1/directions?origin=" + 
                    doc.data().lat_gps + "," + doc.data().lon_gps + "&destination=" + 
                    that.dataDestinationLat + "," + that.dataDestinationLon + 
                    "&key=AIzaSyBexD8Iv8DROSjaOTKMetx6zOrJHIscsTw&zoom=14"
      });
    });
  }

  componentDidUpdate() {
    document.getElementById('google-iframe').onload = function() {
      console.log('myframe is loaded');
    };
  }

  render() {
    return (
      <div>
        <iframe id="google-iframe" frameBorder="0" className="iframe-styles" src={this.state.urlIframe} allowFullScreen></iframe>
      </div>
    )
  }
}

export default MapContainer
