
import React, { Component } from 'react';
import AuthByTime from './AuthByTime'
import AuthByTimeDelayed from './AuthByTimeDelayed'
import FooterDashboard from './FooterDashboard';
import HeaderDashboard from './HeaderDashboard';
import Chat from '../ModalComponents/Chat';

// DB
import DBConnection from '../DBConnection';

// Redux
import {connect} from 'react-redux';
import {getAuthThunk} from '../../store/actions/authActions';
import {showModal, hideModal} from '../../store/actions/modalActions'

// Styles
import '../../styles/Dashboard.scss';

class ProvidersDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flexHeight: 0,
      dataModal: '',
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
          getFooterTable = document.getElementsByClassName('footerTable')[0].offsetHeight,
          fullHeight = getHeader + getHeadTable + getFooterTable,
          heightChanged = getWindowHeight - fullHeight;
    /* Connect and wait for changes on de Database */
    var flagDocChanges = false;
    const firestore = DBConnection.firestore(),
          query = firestore.collection('auth').orderBy("dt_start", "desc"),
          self = this
    function updateDBDisplay() {
      if (!flagDocChanges) {
        waitForChanges();
      }
      self.setState({ 
        flexHeight: heightChanged,
        })
      } 
      updateDBDisplay();
      function waitForChanges() {
        flagDocChanges = true;
        self.unsubscribe = query.onSnapshot(function() {
          updateDBDisplay();
        })
      }
  }

  openModalHandler = (dataValues) => {
    this.props.showModal()
    this.setState({
      dataModal: dataValues
    });
  }

  closeModalHandler() {
    this.props.hideModal()
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {users} = this.props
    return (
      <div className="dashboard">
        {this.props.modalHandler ? <Chat dataUser={this.state.dataModal} closeModalHandler={this.openModalHandler.bind(this)}/> : '' }
        <header ref="headerRef">CONTROL PANEL VMD - Usuarios</header>
          <div className="body-wrapper">
          <table className="w-100 table-styles">
            <HeaderDashboard/>
            <tbody>
              <tr style={{height: this.state.flexHeight + 'px'}} ref="statusHeight">
                <td className="align-bottom body-ai">
                  <AuthByTime
                    dataValues={users[0].id} 
                    flexHeight={this.state.flexHeight}
                    dotStyle="circle-ai"
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}
                    closeModal={this.closeModalHandler}/>
                </td>
                <td className="align-bottom body-manual body-id-red">
                  <AuthByTimeDelayed 
                    category={users[1].idDelayed}
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}
                    closeModal={this.closeModalHandler}
                    />
                </td> 
                <td className="align-bottom body-ai">
                  <AuthByTime
                    category={users[2].service} 
                    dotStyle="circle-ai"
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}/>
                </td>
                <td className="align-bottom body-manual body-service-red">
                  <AuthByTimeDelayed 
                    category={users[3].serviceDelayed} 
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}/>
                </td>
                <td className="align-bottom body-ai">
                  <AuthByTime
                    category={users[4].monitor} 
                    dotStyle="circle-ai"
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}/>
                </td> 
                <td className="align-bottom body-manual">
                  <AuthByTimeDelayed
                    category={users[5].monitorDelayed} 
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}/>
                </td>
                <td className="align-bottom body-manual body-monitoring-red">
                  <AuthByTimeDelayed 
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}/>
                </td>
                <td className="align-bottom body-outcome">
                  <AuthByTimeDelayed
                    category={users[6].outcome} 
                    dotStyle="circle-outcome"
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}/>
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

const mapStateToProps = (state) => {
  return {
      users: state.users,
      dataModal: '',
      modalHandler: state.modalReducers.modalHandler,
      // Some statetoprops to work in the future
      // hasErrored: state.isLoading,
      // isLoading: state.hasErrored,
      // modalHandler: state.modalHandler,
      // menuDisplay: state.menuDisplay,
  }
}

const mapDispatchToProps = dispatch => {
  dispatch(getAuthThunk())
  return {
    showModal: () => { dispatch(showModal()) },
    hideModal: () => { dispatch(hideModal()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProvidersDashboard);
