
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Styles
import '../../styles/HeaderDashboard.scss';

class HeaderDashboard extends Component {

  render() {
    return (
      <thead>
        <tr className="headTableRef">
          <th className="head-ai">ID</th>
          <th className="head-manual">
            <Link to="id" target="_blank"><div className="plus-open"><i className="material-icons drop-shadow">add_circle</i></div></Link>
          </th> 
          <th className="head-ai">SERVICIO</th>
          <th className="head-manual">
            <Link to="service" target="_blank"><div className="plus-open"><i className="material-icons drop-shadow">add_circle</i></div></Link>
          </th>
          <th className="head-ai">MONITOREO</th> 
          <th className="head-manual">
            <Link to="monitoring-on-time" target="_blank"><div className="plus-open"><i className="material-icons drop-shadow">add_circle</i></div></Link>
          </th>
          <th className="head-manual">
            <Link to="monitoring-delayed" target="_blank"><div className="plus-open"><i className="material-icons drop-shadow">add_circle</i></div></Link>
          </th>
          <th className="bg-outcome">OUTCOME</th> 
        </tr>
      </thead>
    );
  }
}

export default HeaderDashboard;
