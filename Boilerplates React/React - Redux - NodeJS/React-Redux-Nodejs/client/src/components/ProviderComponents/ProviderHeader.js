
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ProviderHeader extends Component {
  render() {
    return (
      <thead>
        <tr className="headTableRef">
          <th className="head-ai">FREE - AI</th>
          <th className="head-manual">
            <Link to="id" target="_blank"><div className="plus-open"><i className="material-icons drop-shadow">add_circle</i></div></Link>
          </th> 
          <th className="head-ai">PREASSIGNED - AI</th>
          <th className="head-manual">
            <Link to="id" target="_blank"><div className="plus-open"><i className="material-icons drop-shadow">add_circle</i></div></Link>
          </th> 
          <th className="head-ai">ASSIGNED - AI</th> 
          <th className="head-manual">
            <Link to="id" target="_blank"><div className="plus-open"><i className="material-icons drop-shadow">add_circle</i></div></Link>
          </th> 
          <th className="head-ai">ATT - AI</th>
          <th className="head-manual">
            <Link to="id" target="_blank"><div className="plus-open"><i className="material-icons drop-shadow">add_circle</i></div></Link>
          </th> 
        </tr>
      </thead>
    );
  }
}

export default ProviderHeader;
