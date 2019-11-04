import React from "react"
import { connect } from "react-redux";
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"

import { sidebarFirstOpen } from '../../store/actions/frontActions';
import { listenAssigns, matchToStore } from '../../store/actions/getAssignations';
import '../../styles/MapComponents/mapSidebar.scss';

import Markers from './Markers';
import Footer from '../GeneralComponents/Footer';
import Header from '../GeneralComponents/Header';

class FullMap extends React.PureComponent {
  constructor(props) {
    super(props)
    this.subscribe = null;
    this.state = {
      isMarkerShown: true,
    }
  }

  componentDidMount() {
    this.subscribe = setTimeout(() => {
      this.props.matchTo(this.props.data.params)
      this.props.getAssigns(this.props.user.specialty)
    }, 100)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: true })
  }

  componentWillUnmount() {
    this.subscribe = null
  }

  render() {
    return (
    <div>
      <Header />
      <Map
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
      <Footer />
    </div>
    )
  }
}


const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDLnpXWJx1qKAfHtTeYWa30b9jGH2GeXfs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
  )((props) =>
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{  lat: -34.6223651, lng: -58.44965200000001 }}
            defaultOptions={{ 
              streetViewControl: false,
              scaleControl: false,
              mapTypeControl: false,
              panControl: false,
              zoomControl: true,
              rotateControl: false,
              fullscreenControl: false }}
        >
          <Markers />
        </GoogleMap>
   )

const mapStateToProps = (state) => {
    return {
        all: state.assignations.all,
        selected: state.assignations.selected,
        user: state.assignations.match
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      sidebarFirstOpen: () => { dispatch(sidebarFirstOpen()) },
      getAssigns: (specialty) => { dispatch(listenAssigns(specialty)) },
      matchTo: (match) => { dispatch(matchToStore(match)) }
      }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(FullMap);