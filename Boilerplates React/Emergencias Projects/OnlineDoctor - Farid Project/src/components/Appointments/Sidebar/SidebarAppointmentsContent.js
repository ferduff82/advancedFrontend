import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { sidebarSecOpen } from '../../../store/actions/frontActions';
import 'moment/locale/es';
import { listenAppointment } from '../../../store/actions/getAssignations'; // firebase Actions


class sidebarContent extends React.Component {

  viewSidebar = () => {
    this.props.sidebarOpen()
  }

  dateHandler(appoint) {
    this.props.getAppoint(appoint.specialty, appoint.key)
    this.viewSidebar()
  }

  render() {
  const {selected, available} = this.props
  return (
    <div className='sidebar-content'>
      {selected && selected !== 0 ?
        <div>
          <div className="box-sidebar-title d-flex">
            <div className="data-container">
              <div className='sidebar-subtitle'>
                <b className="sidebar-bold">Turnos en: {available[0].address} </b>
              </div>
            </div>
          </div>
          {available.map((appoint) => {
            return <div className="sidebar-appointment-container" onClick={() => this.dateHandler(appoint)} key={appoint.key}>
                <div className='sidebar-appointment-event'>
                <i className="fas fa-clock appointment-clock"></i><p><Moment format="dddd DD/MM/YYYY HH:mm:ss" locale="es">{appoint.start}</Moment></p>
                </div>
              </div>
          })}
        </div>
        :
        <div></div>
      }
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.assignations.selected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sidebarOpen: (specialty, key) => { dispatch(sidebarSecOpen(specialty, key)) },
    getAppoint: (specialty, appointment) => { dispatch(listenAppointment(specialty, appointment)) },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(sidebarContent);