
import React, { Component } from 'react';
import LoaderOverlay from './LoaderOverlay/LoaderOverlay';

// Redux
import {hideModal} from '../store/actions/modalActions';
import {connect} from 'react-redux'
import {compose} from 'redux';

// Styles
import '../styles/GeneralComponents/Modal.scss';

const Modal = (WrappedComponent) => {
  class ModalTemplate extends Component {
    constructor(props) {
      super(props)
    }

    closeModalHandler() {
      this.props.hideModal()
    }

    setScrollHeight() {
      var element = document.getElementById('modalScroll');
      element.scrollTo(0, element.scrollHeight)
    }

    render() {
      return (
        <div className="ModalTemplate">
          <div className="modalBack"></div>
          <div className="modalContentContainer">
            <div className="modalContent">
              <div className="modalHead d-flex position-relative">
                <div className="modalTitle">Manual Input</div>
                <div className="modalClose position-absolute" onClick={this.closeModalHandler.bind(this)}><i className="material-icons">clear</i></div>
              </div>
              <div className="mainModalContent" id="modalScroll">
                {this.props.loadingHandler ? <LoaderOverlay/> : '' }
                <WrappedComponent {...this.props} triggerScroll={() => this.setScrollHeight()}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return ModalTemplate;
}

const mapStateToProps = (state) => {
  return {
    loadingHandler: state.frontReducers.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => { dispatch(hideModal()) }
  }
}

const composeModalWrapper = compose(
  connect(mapStateToProps, mapDispatchToProps), Modal
)

export default composeModalWrapper;
