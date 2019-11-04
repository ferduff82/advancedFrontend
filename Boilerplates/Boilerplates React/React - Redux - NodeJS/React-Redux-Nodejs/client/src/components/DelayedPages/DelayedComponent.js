import React, { Component } from 'react';
import MonitorUsers from './MonitorUsers'

class DelayedComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displaycontent: 'dashboard',
      menuDisplay: false
    }
  }
  render() {
    return  (
      <div className="App d-flex">
        <MonitorUsers page={this.props.page} collection={this.props.collection} num={3}/>
      </div>
    )
  }
}

export default DelayedComponent;