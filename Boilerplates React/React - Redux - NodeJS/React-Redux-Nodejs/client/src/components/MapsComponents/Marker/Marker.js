import React, {Component} from "react";
import { connect } from "react-redux";
import {addMarker, sidebarOpen} from '../../../store/actions/mapActions';

import { Marker } from "react-google-maps";
const MARKER_CASES = require('./markerCases.json');

class Markers extends Component {
  constructor(props) {
    super(props);
    this.state= {markers: this.props.places};   //1.initialize initial state from props
  }

  updateMarker() {
      this.setState(prevState => {
        const markers = this.props.places;
        return {markers};
     })
  }

  componentDidMount() {
    this.intervalId = setInterval(this.updateMarker.bind(this), 1000);
  }

  loadMarkerData = (marker) =>  this.props.addMarker(marker)
  
  viewSidebar = () =>  this.props.sidebarOpen()
    
  render() {
    const markerScaled = new window.google.maps.Size(30,50);
    return this.state.markers.map(place => {
      let user_icon_marker = null;
        if(MARKER_CASES.ID.includes(place.context)){
          user_icon_marker = MARKER_CASES.ICON_IMAGES.att_users;
        }else if(MARKER_CASES.SERVICE.includes(place.context)){
          user_icon_marker = MARKER_CASES.ICON_IMAGES.assigned_users;
        }else if(place.context != undefined && place.context != '' && place.context.includes(MARKER_CASES.MONITORING)){
            user_icon_marker = MARKER_CASES.ICON_IMAGES.preassigned_users;
        }else if(MARKER_CASES.OUTCOME.includes(place.context)){
          user_icon_marker = MARKER_CASES.ICON_IMAGES.no_users;
        }else{
          place = false;
          return;
        }

      
      return (
        <Marker 
              key={`${place.id}`} 
              position={{ 
                lat: parseFloat(place.lat), 
                lng: parseFloat(place.lon) 
              }}
              icon={{
                url: user_icon_marker,
                scaledSize:  markerScaled
              }}
              onClick={() => {
                this.viewSidebar();
                this.loadMarkerData(place);
              }}
              onMouseOver={()=>{console.log('mouseOver')}}
              onMouseOut={()=>{console.log('mouseOut')}}
              onRightClick={()=>{ console.log('rightclick')}}
              onDblClick={()=>{ console.log('doble click ')}}
          />
      );
    });
  }
}

const mapStateToProps = (state) => {
  return {
      places: state.mapReducers.active_users,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMarker: (place) => { dispatch(addMarker(place)) },
    sidebarOpen: () => { dispatch(sidebarOpen()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markers);