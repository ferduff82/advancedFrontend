import React from 'react';
import StatusTemplate from './StatusTemplate';
import { idRegex, serviceRegex, monitorRegex, outcomeRegex } from '../../constants/regEx';
import {connect} from 'react-redux';

// Styles
import '../../styles/AuthByTimeDelayed.scss';
import { getDelayedArray } from '../../store/selectors/dateSelectors';

class AuthByTime extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      delayed100: [],
      delayed120: [],
      delayed140: [],
      delayed160: [],
      delayed180: [],
    }
  }
  
  filterByTime = () => {
    // Calculating delay
    let delayed = {}
    let delayed100 = [], delayed120 = [], delayed140 = [], delayed160 = [], delayed180 = []
    let currentDate = new Date()
    let delayedTime = currentDate.getTime() - 135000 // Es delayed
    if(this.props.category) {
      this.props.category.forEach((auth) => {
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
        if(elapsedTime > -20000 && elapsedTime < 0) { //  
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
      this.filterByTime()
      setInterval(() => this.filterByTime(), 10) 
    }

    render() {
    const {flexHeight, openModalHandler, closeModalHandler} = this.props
    return(
      <div className="authByTimeDelayed">
        <table className="w-100">
          <tbody>
          <tr>
          <td className="status-container">
          {this.props.delayed ? <StatusTemplate 
                dataValues={this.state.delayed100}
                dotDisplayNumber="1"
                flexHeight={flexHeight}
                openModalHandler={openModalHandler}
                closeModal={closeModalHandler} /> : <div></div>}     
          </td>
          <td className="status-container">
          {this.props.delayed ? <StatusTemplate 
                dataValues={this.props.delayed.d120}
                dotDisplayNumber="1"
                flexHeight={flexHeight}
                openModalHandler={openModalHandler}
                closeModal={closeModalHandler} /> : <div></div>}     
          </td>
          <td className="status-container">
          {this.props.delayed ? <StatusTemplate 
                dataValues={this.props.delayed.d140}
                dotDisplayNumber="1"
                flexHeight={flexHeight}
                openModalHandler={openModalHandler}
                closeModal={closeModalHandler} /> : <div></div>}     
          </td>
          <td className="status-container">
          {this.props.delayed ? <StatusTemplate 
                dataValues={this.props.delayed.d160}
                dotDisplayNumber="1"
                flexHeight={flexHeight}
                openModalHandler={openModalHandler}
                closeModal={closeModalHandler} /> : <div></div>}     
          </td>
          <td className="status-container last-status"> 
          {this.props.delayed ? <StatusTemplate 
                dataValues={this.props.delayed.d180}
                dotDisplayNumber="1"
                flexHeight={flexHeight}
                openModalHandler={openModalHandler}
                closeModal={closeModalHandler} /> : <div></div>}      
          </td>
          </tr>
          </tbody>
        </table>
    </div>
    )
  }
}

const mapStateToProps = (state, props) => {
      if(props.type === "id") {
        return { 
          delayed: getDelayedArray(state.users.id, props.type) }
      } else if (props.type === "service") {
        return { delayed: getDelayedArray(state.users.service, props.type) }
      } else if (props.type === "monitor") {
        return { delayed: getDelayedArray(state.users.monitor, props.type) }
      } else if (props.type === "outcome") {
        return { delayed: getDelayedArray(state.users.outcome, props.type) }
      } 
}

export default connect(mapStateToProps)(AuthByTime);
