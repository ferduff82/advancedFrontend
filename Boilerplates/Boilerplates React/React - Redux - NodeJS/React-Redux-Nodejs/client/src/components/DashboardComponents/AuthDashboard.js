import React, { Component } from 'react';
import AuthByTime from './AuthByTime'
import AuthByTimeDelayed from './AuthByTimeDelayed'
import FooterDashboard from './FooterDashboard';
import HeaderDashboard from './HeaderDashboard';
import Chat from '../ModalComponents/Chat';

// Redux
import {connect} from 'react-redux';
import {getAuthThunk} from '../../store/actions/authActions';
import {showModal} from '../../store/actions/modalActions';
import {getOntime, getDelayed} from '../../store/selectors/dateSelectors';

// Styles
import '../../styles/Dashboard.scss';

class AuthDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flexHeight: 0,
      dataModal: '',
    };
  }

  componentDidMount() { 
    const getWindowHeight = window.innerHeight,
          getHeader = this.refs.headerRef.clientHeight,
          getHeadTable = document.getElementsByClassName('headTableRef')[0].offsetHeight,
          getFooterTable = document.getElementsByClassName('footerTable')[0].offsetHeight,
          fullHeight = getHeader + getHeadTable + getFooterTable,
          heightChanged = getWindowHeight - fullHeight;
    this.setState({ 
      flexHeight: heightChanged,
    })
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
  
  render() {
    const {id, service, monitor, outcome, idDelayed, serviceDelayed, monitorDelayed} = this.props
    return (
      <div className="dashboard">
        {this.props.modalHandler ? <Chat dataUser={this.state.dataModal}/> : '' }
        <header ref="headerRef">CONTROL PANEL VMD - Usuarios</header>
          <div className="body-wrapper">
          <table className="w-100 table-styles">
            <HeaderDashboard/>
            <tbody>
              <tr style={{height: this.state.flexHeight + 'px'}} ref="statusHeight">
                <td className="align-bottom body-ai">
                  <AuthByTime
                    dataValues={id} 
                    flexHeight={this.state.flexHeight}
                    dotStyle="circle-ai"
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)} />
                </td>
                <td className="align-bottom body-manual body-id-red">
                  <AuthByTimeDelayed 
                    category={idDelayed}
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}
                    type="id" />
                </td> 
                <td className="align-bottom body-ai">
                  <AuthByTime
                    category={service} 
                    dotStyle="circle-ai"
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}/>
                </td>
                <td className="align-bottom body-manual body-service-red">
                  <AuthByTimeDelayed 
                    category={serviceDelayed} 
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}
                    type="service" />
                </td>
                <td className="align-bottom body-ai">
                  <AuthByTime
                    category={monitor} 
                    dotStyle="circle-ai"
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}/>
                </td> 
                <td className="align-bottom body-manual">
                  <AuthByTimeDelayed
                    category={monitorDelayed} 
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}
                    type="monitor" />
                </td>
                <td className="align-bottom body-manual body-monitoring-red">
                  <AuthByTimeDelayed 
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}/>
                </td>
                <td className="align-bottom body-outcome">
                  <AuthByTimeDelayed
                    category={outcome}
                    dotStyle="circle-outcome"
                    flexHeight={this.state.flexHeight}
                    openModalHandler={(dataValues) => this.openModalHandler(dataValues)}
                    type="outcome" />
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
      all: state.users.all,
      id: getOntime(state.users.id),
      idDelayed: getDelayed(state.users.id),
      service: getOntime(state.users.service),
      serviceDelayed: getDelayed(state.users.service),
      monitor: getOntime(state.users.monitor),
      monitorDelayed: getDelayed(state.users.monitor),
      outcome: state.users.outcome,
      dataModal: '',
      modalHandler: state.frontReducers.modalHandler,
  }
}

const mapDispatchToProps = dispatch => {
  dispatch(getAuthThunk())
  return {
    showModal: () => { dispatch(showModal()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthDashboard);
