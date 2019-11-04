
import React, { Component } from 'react';

import DBConnection from '../DBConnection';
import StatusTemplate from '../views/DashboardComponents/StatusTemplate';
import '../../styles/DashboardComponents/GeneralTableStyles.scss';

import { idRegex, serviceRegex, monitorRegex, outcomeRegex} from '../../constants/regEx'

class MonitorProviders extends Component {

  constructor(props) {
		super(props);
    this.state = {
      flexHeight: 0,
      dataFirebase: [],
      collection: this.props.collection.toString()
    }
  }

  componentDidMount() {
    /* Connect and wait for changes on de Database */
    var flagDocChanges = false;
    const firestore = DBConnection.firestore(),
          query = firestore.collection(this.state.collection),
          self = this;

    function updateDBDisplay() {
      if (!flagDocChanges) {
        waitForChanges();
      }
      query.get().then((subCollectionSnapshot) => {
        var tempArray = [];
        subCollectionSnapshot.forEach((subDoc) => {
            if(self.props.page === "id") {
                if(idRegex.test(subDoc.data().context)) {
                  tempArray.push(subDoc.data())
                }
            } else if (self.props.page === "service") { 
                if(serviceRegex.test(subDoc.data().context)) {
                  tempArray.push(subDoc.data())
                }
            } else if (self.props.page === "monitor") { 
              if(monitorRegex.test(subDoc.data().context)) {
                tempArray.push(subDoc.data())
              }
            } else if (self.props.page === "outcome") { 
              if(outcomeRegex.test(subDoc.data().context)) {
                tempArray.push(subDoc.data())
              }
            }
        })
        self.setState({ dataFirebase: tempArray})
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
      <div>
        <table className="tableGeneralStyles">
          <thead>
            <tr>
              <td></td>
              <td></td>
              <td>{this.props.page.charAt(0).toUpperCase()+this.props.page.slice(1).toLowerCase()}</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr className="time-keys">
              <td className="align-top">20s</td>
              <td className="align-top">40s</td>
              <td className="align-top">60s</td>
              <td className="align-top">80s</td>
              <td className="align-top">100s</td>
            </tr>
            <tr className="data-keys">
              <td className="align-bottom table-container">
                {
                <StatusTemplate 
                  dataValues={this.state.dataFirebase} 
                  dotDisplayNumber="10"
                  flexHeight={this.state.flexHeight}
                  openModal={(dataValues) => this.openModal(dataValues)}
                  page="auth" />
                }              
              </td>
              <td className="align-bottom table-container">                
                ...a
              </td>
              <td className="align-bottom table-container">                
                ...
              </td>
              <td className="align-bottom table-container">                
                ...
              </td>
              <td className="align-bottom table-container highest-priority">             
                ...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MonitorProviders;
