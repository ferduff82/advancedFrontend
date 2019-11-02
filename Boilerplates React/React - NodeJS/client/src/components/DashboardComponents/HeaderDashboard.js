
import React, { Component } from 'react';


class HeaderDashboard extends Component {

  render() {

    return (
      <thead>
        <tr className="headTableRef">
          <th className="head-id">ID - AI</th>
          <th className="head-id">ID - MANUAL</th> 
          <th className="head-service">SERVICE - AI</th>
          <th className="head-service">SERVICE - MANUAL</th>
          <th className="head-monitoring">MONITORING - AI</th> 
          <th className="head-monitoring">MONITORING - MANUAL - <span>ON TIME</span></th>
          <th className="head-monitoring">MONITORING - MANUAL - <span>DELAYED</span></th>
          <th className="head-outcome">OUTCOME</th> 
        </tr>
      </thead>
    );
  }
}

export default HeaderDashboard;
