import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/generalComponents/Alert.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faBan, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
// <Alert alertType="success" titleMessage="" customMessage="" />

const AlertComponent = (props) => {
    const dispatch = useDispatch()
    const alertDisplay = useSelector(state => state.front.alert)

    let setDisplay = () => {
        dispatch({ type: 'ALERT', payload: { type: '', title: '', msg: '' } })
    }

    useEffect(() => {
        const alertTimer = window.setInterval(() => {
            dispatch({ type: 'ALERT', payload: { type: '', title: '', msg: '' } })
          }, props.timerRemove ? props.timerRemove : 13000);
          return () => { 
            window.clearInterval(alertTimer);
          };
    }, []);

    if (alertDisplay) {
        if (props.alertType === 'success') {
            return(
                <div className="alertModal">
                    <div className="modalContainer success d-flex">
                        <div className="iconLeft"><FontAwesomeIcon icon={faCheck} /></div>
                        <div className="textContainer">
                            <span className="titleContainer">{props.titleMessage}{props.titleMessage ? ': ' : ''}</span>
                            <span className="messageContainer">{props.customMessage}</span>
                        </div>
                        <div className="alertClose" onClick={() => setDisplay(false)}><FontAwesomeIcon icon={faTimes} /></div>
                    </div>
                </div>
            )
        } else if (props.alertType === 'warning') {
            return(
                <div className="alertModal">
                    <div className="modalContainer warning d-flex">
                        <div className="iconLeft"><FontAwesomeIcon icon={faExclamationTriangle} /></div>
                        <div className="textContainer">
                            <span className="titleContainer">{props.titleMessage}. </span>
                            <span className="messageContainer">{props.customMessage}</span>
                        </div>
                        <div className="alertClose" onClick={() => setDisplay(false)}><FontAwesomeIcon icon={faTimes} /></div>
                    </div>
                </div>
            )
        } else if (props.alertType === 'danger') {
            return(
                <div className="alertModal">
                    <div className="modalContainer danger d-flex">
                        <div className="iconLeft"><FontAwesomeIcon icon={faBan} /></div>
                        <div className="textContainer">
                            <span className="titleContainer">{props.titleMessage}. </span>
                            <span className="messageContainer">{props.customMessage}</span>
                        </div>
                        <div className="alertClose" onClick={() => setDisplay(false)}><FontAwesomeIcon icon={faTimes} /></div>
                    </div>
                </div>
            )
        } else if (props.alertType === 'info') {
            return(
                <div className="alertModal">
                    <div className="modalContainer info d-flex">
                        <div className="iconLeft"><FontAwesomeIcon icon={faExclamationCircle} /></div>
                        <div className="textContainer">
                            <span className="titleContainer">{props.titleMessage} </span>
                            <span className="messageContainer">{props.customMessage}</span>
                        </div>
                        <div className="alertClose" onClick={() => setDisplay(false)}><FontAwesomeIcon icon={faTimes} /></div>
                    </div>
                </div>
            )
        } else if (props.alertType === 'question') {
            return(
                <div className="alertModal">
                    <div className="modalContainer info">
                        <div className="d-flex">
                            <div className="iconLeft"><FontAwesomeIcon icon={faExclamationCircle} /></div>
                            <div className="textContainer">
                                <span className="titleContainer">{props.titleMessage}: </span>
                                <span className="messageContainer">{props.customMessage}</span>
                            </div>
                            <div className="alertClose" onClick={() => setDisplay(false)}><FontAwesomeIcon icon={faTimes} /></div>
                        </div>
                        <div className="questionOptions d-flex">
                            <button className="btn btn-active" onClick={() => props.handleConfirm()}>Si</button>
                            <button className="btn btn-active" onClick={() => props.handleReject()}>No</button>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return (
            ''
        )
    }
}

export default AlertComponent;
