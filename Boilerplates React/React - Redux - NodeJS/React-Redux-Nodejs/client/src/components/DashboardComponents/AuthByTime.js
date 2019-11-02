import React from 'react';
import StatusTemplate from './StatusTemplate';
import { idRegex, serviceRegex, monitorRegex, outcomeRegex } from '../../constants/regEx'

class AuthByTime extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      delayed0: [],
      delayed20: [],
      delayed40: [],
      delayed60: [],
      delayed80: [],
    }
  }
  
  filterByTime = () => {
    // Calculating delay
    let delayed0 = [], delayed20 = [], delayed40 = [], delayed60 = [], delayed80 = []
    let delayed100 = [], delayed120 = [], delayed140 = [], delayed160 = [], delayed180 = []
    let currentDate = new Date()
    let delayedTime = currentDate.getTime() - 130000 // Es delayed
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
        if(elapsedTime > 1  && elapsedTime < 20000) {
          delayed80.push(auth)
        } else if(elapsedTime > 20000 && elapsedTime < 40000) {
          delayed60.push(auth)
        } else if(elapsedTime > 40000 && elapsedTime < 60000) {
          delayed40.push(auth)
        } else if(elapsedTime > 60000 && elapsedTime < 80000) {
          delayed20.push(auth)
        } else if(elapsedTime > 80000) {
          delayed0.push(auth)
        } else if(elapsedTime > -20000 && elapsedTime < 0) {
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
      delayed0: delayed0,
      delayed20: delayed20,
      delayed40: delayed40,
      delayed60: delayed60,
      delayed80: delayed80,
      delayed100: delayed100,
      delayed120: delayed120,
      delayed140: delayed140,
      delayed160: delayed160,
      delayed180: delayed180,
    })
    }

    componentDidMount() {
      setTimeout(() => this.filterByTime(), 2500) 
      setInterval(() => this.filterByTime(), 1000) 
    }

    render() {
    const {flexHeight, openModalHandler, closeModalHandler} = this.props
    return(
      <div>
        <table className="w-100">
          <tbody>
          <tr>
          <td className="status-container">
              <StatusTemplate 
                dataValues={this.state.delayed0} 
                dotDisplayNumber="1"
                flexHeight={flexHeight}
                openModalHandler={openModalHandler}
                closeModal={closeModalHandler} />
          </td>
          <td className="status-container">
              <StatusTemplate 
                dataValues={this.state.delayed20} 
                dotDisplayNumber="1"
                flexHeight={flexHeight}
                openModalHandler={openModalHandler}
                closeModal={closeModalHandler} />
          </td>
          <td className="status-container">
              <StatusTemplate 
                dataValues={this.state.delayed40} 
                dotDisplayNumber="1"
                flexHeight={flexHeight}
                openModalHandler={openModalHandler}
                closeModal={closeModalHandler} />
          </td>
          <td className="status-container">
              <StatusTemplate 
                dataValues={this.state.delayed60} 
                dotDisplayNumber="1"
                flexHeight={flexHeight}
                openModalHandler={openModalHandler}
                closeModal={closeModalHandler} />
          </td>
          <td className="status-container"> 
              <StatusTemplate 
                dataValues={this.state.delayed80} 
                /* dataValues={category}  */
                dotDisplayNumber="1"
                flexHeight={flexHeight}
                openModalHandler={openModalHandler}
                closeModal={closeModalHandler} />
          </td>
          </tr>
            </tbody>
        </table>
    </div>
    )
  }
}

export default AuthByTime;
