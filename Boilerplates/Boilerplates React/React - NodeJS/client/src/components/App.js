
import React, { Component } from 'react';
import Dashboard from './Dashboard.js';
import Maps from './Maps.js';
import '../styles/App.scss';

class App extends Component {

  constructor(props) {
		super(props);
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
            Menu
          </div>
          <div className={this.state.menuDisplay ? "menuDisplay" : "hide"}>
            <div onClick={(this.state.displaycontent === 'dashboard') ? null : (e) => this.displayContent(e, 'dashboard')}>Dashboard</div>
            <div onClick={(e) => this.displayContent(e, 'map')}>Maps</div>
          </div>
        </div>
        <div className={this.state.menuDisplay ? 'semi-panel' : 'full-panel'}>
          {(() => {
            switch (this.state.displaycontent) {
              case 'dashboard':
                return <Dashboard/>
              case 'map':
                return <Maps/>
            }
          })()}
        </div>
      </div>
    );
  }
}

export default App;
