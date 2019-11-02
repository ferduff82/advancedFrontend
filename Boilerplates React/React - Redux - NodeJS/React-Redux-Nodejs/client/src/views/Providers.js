
import React, { Component } from 'react';
import DBConnection from '../components/DBConnection';

import StatusTemplate from '../components/DashboardComponents/StatusTemplate';
import ProviderHeader from '../components/ProviderComponents/ProviderHeader';
import ProviderFooter from '../components/ProviderComponents/ProviderFooter';

import '../styles/Dashboard.scss';

class Provider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataReceived: [],
      free: [],
      preassigned: [],
      assigned: [],
      att: [],
      flexHeight: 0,
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
    var flagDocChanges = false

    const firestore = DBConnection.firestore(),
    query = firestore.collection('providers_auth'),
    self = this

    function updateDBDisplay() {
      if (!flagDocChanges) {
        waitForChanges()
      }
      query.get().then((subCollectionSnapshot) => {
        let tempData = [], tempFree = [], tempPreassign = [], tempAssign = [], tempAtt = []
        
      subCollectionSnapshot.forEach((subDoc) => {
            tempData.push(subDoc.data())
            if(subDoc.data().context.toLowerCase()  === "free") {
              tempFree.push(subDoc.data())
            }
            if(subDoc.data().context.toLowerCase() === "preassigned") {
              tempPreassign.push(subDoc.data())
            }
            if(subDoc.data().context.toLowerCase() === "assigned") {
              tempAssign.push(subDoc.data())
            }
            if(subDoc.data().context.toLowerCase() === "att") {
              tempAtt.push(subDoc.data())
            }
        });
        self.setState({ dataReceived: tempData, free: tempFree, preassigned: tempPreassign, assigned: tempAssign, att: tempAtt })
      });
    }
    updateDBDisplay();

    function waitForChanges() {
      flagDocChanges = true;
      self.unsubscribe = query.onSnapshot(function(snapshot) {
          updateDBDisplay();
      });

    }
  }
  openModal(dataValues) {
    var toggleModal = !this.state.openModal;
    this.setState({
      openModal: toggleModal,
      dataModal: dataValues
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {free, preassigned, assigned, att} = this.state
    return (
      <div className="dashboard">
        <header ref="headerRef">PROVIDERS - CONTROL PANEL VMD</header>
        <div className="body-wrapper">
          <table className="w-100 table-styles">
          <ProviderHeader />
        <tbody>
          <tr ref="statusTableHead">
          </tr>
          <tr style={{height: this.state.flexHeight + 'px'}}>
          <td className="align-bottom body-ai"></td>
            <td className="align-bottom body-manual">
              <StatusTemplate 
                dataValues={free} 
                key={free.cuit}
                dotDisplayNumber="5"
                flexHeight={this.state.flexHeight}
                openModal={(dataReceived) => this.openModal(dataReceived)}
              />    
            </td>
            <td className="align-bottom body-ai"></td>
            <td className="align-bottom body-manual">
              <StatusTemplate 
                dataValues={preassigned} 
                key={free.cuit} 
                dotDisplayNumber="5"
                flexHeight={this.state.flexHeight}
                openModal={(dataValues) => this.openModal(dataValues)} />    
            </td>
            <td className="align-bottom body-ai"></td>
            <td className="align-bottom body-manual">
              <StatusTemplate 
                dataValues={assigned} 
                key={free.cuit}
                dotDisplayNumber="5"
                flexHeight={this.state.flexHeight}
                openModal={(dataValues) => this.openModal(dataValues)} />    
            </td>
            <td className="align-bottom body-ai"></td>
            <td className="align-bottom body-manual">
              <StatusTemplate 
                dataValues={att} 
                key={free.cuit}
                dotDisplayNumber="5"
                flexHeight={this.state.flexHeight}
                openModal={(dataValues) => this.openModal(dataValues)} />    
            </td>
          </tr>
          <ProviderFooter/>
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default Provider;
