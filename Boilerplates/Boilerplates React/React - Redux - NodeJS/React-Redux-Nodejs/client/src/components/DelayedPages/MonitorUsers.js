import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAuthThunk} from '../../store/actions/authActions';
import {showModal} from '../../store/actions/modalActions'
import {getDelayed} from '../../store/selectors/dateSelectors';

import DBConnection from '../DBConnection';
import StatusTemplate from '../DashboardComponents/StatusTemplate';
import Chat from '../ModalComponents/Chat'

import { idRegex, serviceRegex, monitorRegex, outcomeRegex } from '../../constants/regEx'

// Styles
import '../../styles/Dashboard.scss';

class MonitorUsers extends Component {

  constructor(props) {
		super(props);
    this.state = {
      flexHeight: 0,
      collection: this.props.collection.toString(),
      page: this.props.page.toString(),
      delayed100: [],
      delayed120: [],
      delayed140: [],
      delayed160: [],
      delayed180: [],
      dataModal: '',
    }
  }

  filterByTime = () => {
    // Calculating delay
    let delayed100 = [], delayed120 = [], delayed140 = [], delayed160 = [], delayed180 = []
    let currentDate = new Date()
    let delayedTime = currentDate.getTime() - 90000 // Es delayed
    if(this.props.page === "id") {
      var category = this.props.id
    } else if (this.props.page === "service") { 
      var category = this.props.service 
    } else if (this.props.page === "monitor") { 
      var category = this.props.monitor }
    if(category) {
      category.forEach((auth) => {
      if(idRegex.test(auth.context)) {
        var d = new Date(auth.dt_start)
      } else if (serviceRegex.test(auth.context)) {
        if(auth.dt_start > auth.dt_intent) {
          var d = new Date(auth.dt_start)
        } else {
          var d = new Date(auth.dt_intent)
        }
      } else if (monitorRegex.test(auth.context)) {
        var d = new Date(auth.dt_request)
      } else if (outcomeRegex.test(auth.context)) {
        var d = new Date(auth.dt_outcome)
      }
      let startTime = d.getTime()
      let elapsedTime = startTime - delayedTime
        if(elapsedTime > -20000 && elapsedTime < 0) {
          delayed100.push(auth)
        } else if(elapsedTime > -40000 && elapsedTime < -20000) {
          delayed120.push(auth)
        } else if(elapsedTime > -60000 && elapsedTime < -40000) {
          delayed140.push(auth)
        } else if(elapsedTime > -80000 && elapsedTime < -60000) {
          delayed160.push(auth)
        } else if(elapsedTime < -80000) {
          delayed180.push(auth)
        }
      })
    }
    this.setState({
      delayed100: delayed100,
      delayed120: delayed120,
      delayed140: delayed140,
      delayed160: delayed160,
      delayed180: delayed180,
    })
    }

  componentDidMount() {
    setTimeout(() => this.filterByTime(), 2500);
    setInterval(() => this.filterByTime(), 1000); 

    const getWindowHeight = window.innerHeight,
          getHeader = this.refs.headerRef.clientHeight,
          getHeadTable = document.getElementsByClassName('time-keys')[0].offsetHeight,
          fullHeight = getHeader + getHeadTable,
          heightChanged = getWindowHeight - fullHeight;
    this.setState({ 
      flexHeight: heightChanged,
    })
  }
    
  openModalHandler = (dataValues) => {
    this.props.showModal()
    this.setState({
      dataModal: dataValues
    });
  }

  closeModalHandler() {
    this.props.hideModal()
  }

  render() {
    const {flexHeight, page} = this.state
    const {openModalHandler} = this
    return (
      <div className="dashboard">
        {this.props.modalHandler ? <Chat dataUser={this.state.dataModal} closeModalHandler={this.openModalHandler.bind(this)}/> : '' }
        <header ref="headerRef">{page.charAt(0).toUpperCase()+page.slice(1).toLowerCase()}</header>
        <div className="body-wrapper">
        <table className="table-styles w-100 overflow-hidden">
          <tbody>
            <tr className="time-keys">
              <td className="align-top">100s</td>
              <td className="align-top">120s</td>
              <td className="align-top">140s</td>
              <td className="align-top">160s</td>
              <td className="align-top">+3 min</td>
            </tr>
            <tr>
              <td className="align-bottom body-manual table-container-pages" style={{height: this.state.flexHeight}}>
              <StatusTemplate 
                  dataValues={this.state.delayed100} 
                  dotDisplayNumber="10"
                  flexHeight={this.state.flexHeight}
                  openModalHandler={openModalHandler} />
              </td>
              <td className="align-bottom body-manual">                
              <StatusTemplate 
                  dataValues={this.state.delayed120} 
                  dotDisplayNumber="10"
                  flexHeight={this.state.flexHeight}
                  openModalHandler={openModalHandler} />
              </td>
              <td className="align-bottom body-manual">                
              <StatusTemplate 
                  dataValues={this.state.delayed140} 
                  dotDisplayNumber="10"
                  flexHeight={this.state.flexHeight}
                  openModalHandler={openModalHandler} />
              </td>
              <td className="align-bottom body-manual">                
              <StatusTemplate 
                  dataValues={this.state.delayed160} 
                  dotDisplayNumber="10"
                  flexHeight={this.state.flexHeight}
                  openModalHandler={openModalHandler} />
              </td>
              <td className="align-bottom body-manual">             
                <StatusTemplate 
                  dataValues={this.state.delayed180} 
                  dotDisplayNumber="10"
                  flexHeight={this.state.flexHeight}
                  openModalHandler={(dataValues) => openModalHandler(dataValues)}/>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      id: getDelayed(state.users.id),
      service: getDelayed(state.users.service),
      monitor: getDelayed(state.users.monitor),
      dataModal: '',
      modalHandler: state.frontReducers.modalHandler,
  }
}

const mapDispatchToProps = dispatch => {
  dispatch(getAuthThunk())
  return {
    showModal: () => { dispatch(showModal()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonitorUsers);
