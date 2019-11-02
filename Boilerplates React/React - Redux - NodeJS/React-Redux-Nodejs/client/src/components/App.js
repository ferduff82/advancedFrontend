
import React, { Component } from 'react';
import Dashboard from '../views/Dashboard.js';
import Maps from './Maps.js';
import Providers from '../views/Providers.js';
import '../styles/App.scss';
import '../styles/Menu.scss';

class App extends Component {

  constructor(props) {
		super(props)
    this.state = {
      displaycontent: 'dashboard',
      menuDisplay: false
    }
  }

  displayContent(e, displayValue) {
    e.preventDefault();
    this.setState({displaycontent: displayValue});
  }

  toggleMenu(e) {
    e.preventDefault();
    var toggle = !this.state.menuDisplay;
    this.setState({menuDisplay: toggle})
  }

  render() {
    return (
      <div className="App d-flex">
        <div className={this.state.menuDisplay ? 'left-menu open-menu' : 'left-menu closed-menu'}>
          <div onClick={(e) => this.toggleMenu(e)} className="menuToggle">
            <i className="material-icons">apps</i>
          </div>
          <div className={this.state.menuDisplay ? "menuDisplay" : "hide"}>
            <div className={(this.state.displaycontent === 'dashboard') ? "menu-link active" : "menu-link"} onClick={(this.state.displaycontent === 'dashboard') ? null : (e) => this.displayContent(e, 'dashboard')}>Dashboard</div>
            <div className="menu-link" onClick={()=> window.open("/geotracker", "_blank")}>Maps</div>
            <div className={(this.state.displaycontent === 'providers') ? "menu-link active" : "menu-link"} onClick={(e) => this.displayContent(e, 'providers')}>Providers</div>
          </div>
        </div>
        <div className={this.state.menuDisplay ? 'semi-panel' : 'full-panel'}>
          {(() => {
            switch (this.state.displaycontent) {
              case 'dashboard':
                return <Dashboard/>
              case 'map':
                return <Maps/>
              case 'providers':
                return <Providers/>
              default:
                return <Dashboard />
            }
          })()}
        </div>
      </div>
    );
  }
}

export default App;
