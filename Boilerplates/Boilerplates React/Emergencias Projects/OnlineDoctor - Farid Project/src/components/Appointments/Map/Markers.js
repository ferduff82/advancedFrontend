import React from "react";
import { connect } from "react-redux";
import { sidebarFirstOpen } from '../../store/actions/frontActions';
import { listenAppointment } from '../../store/actions/getAssignations'
import '../../styles/MapComponents/mapSidebar.scss';
import { Marker } from "react-google-maps";
import Sidebar from '../Sidebar/Sidebar';
import Loading from '../GeneralComponents/Loading';

class Markers extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      selected: "",
      uniquePlaces: []
    }
  }
  viewSidebar = () =>  this.props.sidebarFirstOpen()

  markerClick = (cm, specialty, key) => {
    this.setState({selected: cm})
    this.props.getAppoint(specialty, key, cm)
    this.viewSidebar()
  }
  
  componentDidUpdate() {
    setTimeout(() => {
     let uniquePlaces = this.props.all.filter((mark, index, self) =>
        index === self.findIndex((t) => (
            t.title === mark.title
        ))
      )
      this.setState({uniquePlaces: uniquePlaces})
    }, 0)
  }

  render() {
    return(
      <div>
        {this.props.firstSidebar ? <div><Sidebar contentType="appointments" data={this.props.all} selected={this.state.selected}/></div> : <div></div>}
        {this.props.secondSidebar ? <div><Sidebar data={this.props.all} selected={this.state.selected}/></div> : <div></div>}
        {this.state.uniquePlaces && this.state.uniquePlaces.length >= 2 ?
        <div>
        {this.state.uniquePlaces.map(med => {
          return <div  key={med.key}>
            <Marker position={{ lat: parseFloat(med.geo.lat), lng: parseFloat(med.geo.long) }} onClick={e => this.markerClick(med.address, med.specialty, med.key)}/>
          </div>
        })
        }
        </div>
          : 
        <Loading />
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
      all: state.assignations.all,
      selected: state.assignations.selected,
      firstSidebar: state.front.sidebar.first,
      secondSidebar: state.front.sidebar.second
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sidebarFirstOpen: () => { dispatch(sidebarFirstOpen()) },
    getAppoint: (specialty, key, cm) => { dispatch(listenAppointment(specialty, key, cm)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markers);