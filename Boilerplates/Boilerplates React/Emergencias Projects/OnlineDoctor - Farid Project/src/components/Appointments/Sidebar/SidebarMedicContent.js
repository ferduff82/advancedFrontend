import React from 'react';
import {connect} from 'react-redux';
import {make_appointment} from '../../../config/endpoints';
import { listenAppointment, selectedAppointment, saveAppointment } from '../../../store/actions/getAssignations';
import { Redirect } from 'react-router';
import '../../../styles/map/mapSidebar.scss';
import Loading from '../GeneralComponents/Loading';
import axios from 'axios';
class sidebarContent extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      submited: false,
      appointment: {},
      loading: false
    }
  }

  componentDidMount() {
    console.log(this.props.selected)
  }
  getIcon(valueIcon) {
      if (valueIcon === 'NOMBRE') {
        return <i className="fas fa-user"></i>
      } else if (valueIcon === 'DIRECCION') {
        return <i className="fas fa-map-marker-alt"></i>
      } else if (valueIcon === 'SEXO') {
        return <i className="fas fa-venus-mars"></i>
      } else if (valueIcon === 'FECHA DEL TURNO') {
        return <i className="far fa-calendar-alt"></i>
      } else if (valueIcon === 'TELEFONO') {
        return <i className="fas fa-phone"></i>;
      } else if (valueIcon === 'ESPECIALIDAD') {
        return <i className="fas fa-notes-medical"></i>
      } else if (valueIcon === 'HORARIO DEL TURNO') {
        return <i className="far fa-clock"></i>;
      } else {
        return <i className="fas fa-clock"></i>;
      }
    }

  renderUserData(fieldTitle, fieldInfo) {
      return (<div className="box-sidebar d-flex">
        <div className="icon-color">
          {this.getIcon(fieldTitle)}
        </div>
        <div className="data-container">
          <div className='sidebar-subtitle'>
            <p> {fieldTitle.toUpperCase()}</p>
          </div>
          <div className='sidebar-info'>
            <p>{`${fieldInfo && !(fieldInfo instanceof Date) ? fieldInfo.toUpperCase() : 'No hay datos disponibles '}`}</p>
          </div>
        </div>
      </div>)
  }


  confirmAppointment(data) {
    // this.setState({loading: true})
    var d = new Date()
    var currentMonth = ('0' + (d.getMonth() + 1)).substr(-2)
    var currentDay = ('0' + d.getDate()).substr(-2)
    var currentHours = ('0' + (d.getHours())).substr(-2)
    var currentMinutes = ('0' + d.getMinutes()).substr(-2)
    var currentSeconds = ('0' + d.getSeconds()).substr(-2)
    const currentDate = [d.getFullYear(), currentMonth, currentDay].join('-') + ' ' +
        [currentHours, currentMinutes, currentSeconds].join(':');
    let confirmJson
    confirmJson={
      'ws': '447462391503',  // hardcoded
      'dni': '95746359',
      'msg': 'make_appointment', 
      'dt': currentDate,
      'ruta': this.props.selected.path.slice(13),
      'cm': this.props.selected.cm,
      'specialty': this.props.selected.especialidad
    }
    
    let prevAppointments = [...this.props.appointments]
    prevAppointments.push(confirmJson)
    this.props.saveAppointment(prevAppointments)
    this.props.selectedAppointment(confirmJson)
    console.log(prevAppointments)
    const headers = { 'Content-type': 'application/json' }
    this.setState({ submited: true })
    if(confirmJson.ruta !== '') {
      axios.post(make_appointment, JSON.stringify(confirmJson), { headers })
          .then(res => {
              this.props.selectedAppointment(res.data)
              this.setState({submited: true, appointment: res.data})
              console.log(res)
          })
          .catch(err => {
              console.log(err)
          })
      } 
  }
  
  render() {
    const {path_profile_pic, fullname, cm, date, time, especialidad} = this.props.selected
    if (this.state.submited) {
      return <Redirect to={`/${this.props.match.dni}/${this.props.match.ws}/appointments/online/confirm`} appointmentData={this.state.appointment} />
    } else {
    return ( 
    <div className='sidebar-content'>
    {this.state.loading === true ? 
        <Loading />
        : <></> }
        {this.props.selected  && this.props.selected !== 0 ?
          <div>
                <div className="d-flex header-margin">
                {path_profile_pic && path_profile_pic !== "" ?
                  <img className="med-avatar" src={path_profile_pic} alt={fullname} />
                  :
                  <i className="med-avatar-notfound fas fa-user-md fa-6x"></i>
                }
                </div>
            <div>{this.renderUserData('NOMBRE', fullname)}</div>
            <div>{this.renderUserData('DIRECCION', cm)}</div>
            <div>{this.renderUserData('FECHA DEL TURNO', date)}</div>
            <div>{this.renderUserData('HORARIO DEL TURNO', time)}</div>
            <div>{this.renderUserData('ESPECIALIDAD', especialidad)}</div>
            <div className="d-flex mt-3 turno-button">
              <button  type="button" className="btn btn-info confirm-appointment"
                    onClick={() => this.confirmAppointment()}>
                    Seleccionar turno</button>
            </div>
        </div> :
        <div></div>
        }
      </div>
    )
  }
  }
}

const mapStateToProps = (state) => {
    return {
        selected: state.assignations.selected,
        appointments: state.assignations.appointments,
        match: state.assignations.match
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listenAppointments: (specialty, key) => { dispatch(listenAppointment(specialty, key)) },
        selectedAppointment: (appoint) => { dispatch(selectedAppointment(appoint))},
        saveAppointment: (appoint) => { dispatch(saveAppointment(appoint))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(sidebarContent);