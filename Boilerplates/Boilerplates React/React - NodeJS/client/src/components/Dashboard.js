
import React, { Component } from 'react';

import StatusTemplate from './DashboardComponents/StatusTemplate';
import FooterDashboard from './DashboardComponents/FooterDashboard';
import HeaderDashboard from './DashboardComponents/HeaderDashboard';
import DBConnection from './DBConnection';
import '../styles/Dashboard.scss';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flexHeight: 0,
      dataFirebase: []
    };
  }

  componentDidMount() {

    const getWindowHeight = window.innerHeight,
          getHeader = this.refs.headerRef.clientHeight,
          getHeadTable = document.getElementsByClassName('headTableRef')[0].offsetHeight,
          getStatusTable = this.refs.statusTableHead.clientHeight,
          getFooterTable = document.getElementsByClassName('footerTable')[0].offsetHeight,
          fullHeight = getHeader + getHeadTable + getStatusTable + getFooterTable,
          heightChanged = getWindowHeight - fullHeight;

    this.setState({ flexHeight: heightChanged });

    /* Connect and wait for changes on de Database */

    var flagDocChanges = false;
    const firestore = DBConnection.firestore(),
          query = firestore.collection('auth'),
          self = this;

    function updateDBDisplay() {
      if (!flagDocChanges) {
        waitForChanges();
      }
      query.get().then((subCollectionSnapshot) => {
        self.setState({dataFirebase: []});
        subCollectionSnapshot.forEach((subDoc) => {
            self.setState(prevState => ({
              dataFirebase: [...prevState.dataFirebase, subDoc.data()]
            }))
            console.log(self.state.dataFirebase);
        });
      });
    } updateDBDisplay();

    function waitForChanges() {
      flagDocChanges = true;
      query.onSnapshot(function(snapshot) {
          updateDBDisplay();
      });
    }
  }

  render() {
    return (
      <div className="dashboard">
        <header ref="headerRef">CONTROL PANEL VMD</header>
        <div className="body-wrapper">
          <table className="w-100 table-styles">
            <HeaderDashboard/>
            <tbody>
              <tr ref="statusTableHead">
                <td className="body-id">asdf</td>
                <td className="body-id show-full-screen ">+</td> 
                <td className="body-service">asdf</td>
                <td className="body-service show-full-screen">+</td>
                <td className="body-monitoring">asdf</td> 
                <td className="body-monitoring show-full-screen">+</td>
                <td className="body-monitoring show-full-screen">+</td>
                <td className="body-outcome">asdfasd</td> 
              </tr>
              <tr style={{height: this.state.flexHeight + 'px'}}>
                <td className="align-bottom body-id border-right-id">
                  <StatusTemplate dataValues={this.state.dataFirebase}/>
                </td>
                <td className="align-bottom body-id body-id-red">
                  <StatusTemplate dataValues={this.state.dataFirebase}/>
                </td> 
                <td className="align-bottom body-service border-right-service">
                  <StatusTemplate dataValues={this.state.dataFirebase}/>
                </td>
                <td className="align-bottom body-service body-service-red">
                  <StatusTemplate dataValues={this.state.dataFirebase}/>
                </td>
                <td className="align-bottom body-monitoring border-right-monitoring">
                  <StatusTemplate dataValues={this.state.dataFirebase}/>
                </td> 
                <td className="align-bottom body-monitoring border-right-manual">
                  <StatusTemplate dataValues={this.state.dataFirebase}/>
                </td>
                <td className="align-bottom body-monitoring body-monitoring-red">
                  <StatusTemplate dataValues={this.state.dataFirebase}/>
                </td>
                <td className="align-bottom body-outcome">
                  <StatusTemplate dataValues={this.state.dataFirebase}/>
                </td> 
              </tr>
              <FooterDashboard/>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Dashboard;
