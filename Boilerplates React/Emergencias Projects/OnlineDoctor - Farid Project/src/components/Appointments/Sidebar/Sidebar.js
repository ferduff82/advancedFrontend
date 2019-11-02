import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../styles/map/mapSidebar.scss';
import AbsoluteSidebar from '../AbsoluteSidebar/drawer';
import SidebarMedicContent from './SidebarMedicContent';
import SidebarAppointmentsContent from './SidebarAppointmentsContent';

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = { 'available': {} }
  }

  componentDidMount() {
    if (this.props.contentType === "appointments") {
      const appointmentsAvailable = this.props.data.filter((appoint) => appoint.address.includes(this.props.selected))
      this.setState({ 'available': appointmentsAvailable })
    }
  }

  render() {
    return (<div>
      {this.props.contentType === "appointments" ?
        <AbsoluteSidebar sidebar="first">
          <SidebarAppointmentsContent available={this.state.available} ></SidebarAppointmentsContent>
        </AbsoluteSidebar>
        :
        <AbsoluteSidebar sidebar="second">
          <SidebarMedicContent></SidebarMedicContent>
        </AbsoluteSidebar>
      }
    </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    all: state.assignations.all,
  }
}
export default connect(mapStateToProps)(Sidebar);