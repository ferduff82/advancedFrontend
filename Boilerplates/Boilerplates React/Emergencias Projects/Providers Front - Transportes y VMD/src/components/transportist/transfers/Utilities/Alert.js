
import React, { useState, useEffect } from 'react';
import '../../../../styles/transport/Alert.scss';

const AlertComponent = (props) => {

    const [isAlertDisplayed, setDisplayAlert] = useState(true);

    let setDisplay = (dataDisplay) => {
        setDisplayAlert(dataDisplay)
    }
    
    useEffect(() => {
        console.log(props);
        const alertTimer = window.setInterval(() => {
            setDisplay(false)
          }, props.timerRemove ? props.timerRemove : 13000);
          return () => { 
            window.clearInterval(alertTimer);
          };
    }, []);

    if (isAlertDisplayed) {
        if (props.alertType === 'success') {
            console.log(props.titleMessage)
            return(
                <div className="alertModal" style={{bottom: props.positionBottom + "px"}}>
                    <div className="modalContainer success d-flex">
                        <div className="iconLeft"><i className="fas fa-check"></i></div>
                        <div className="textContainer">
                            <span className="titleContainer">{props.titleMessage}{props.titleMessage ? ': ' : ''}</span>
                            <span className="messageContainer">{props.customMessage}</span>
                        </div>
                        <div className="alertClose" onClick={() => setDisplay(false)}><i className="fas fa-times"></i></div>
                    </div>
                </div>
            )
        } else if (props.alertType === 'warning') {
            return(
                <div className="alertModal" style={{bottom: props.positionBottom + "px"}}>
                    <div className="modalContainer warning d-flex">
                        <div className="iconLeft"><i className="fas fa-exclamation-triangle"></i></div>
                        <div className="textContainer">
                            <span className="titleContainer">{props.titleMessage}. </span>
                            <span className="messageContainer">{props.customMessage}</span>
                            <div className="dataChildren">
                                <div className="test">{props.children}</div>
                            </div>
                        </div>
                        <div className="alertClose" onClick={() => setDisplay(false)}><i className="fas fa-times"></i></div>
                    </div>
                </div>
            )
        } else if (props.alertType === 'danger') {
            return(
                <div className="alertModal" style={{bottom: props.positionBottom + "px"}}>
                    <div className="modalContainer danger d-flex">
                        <div className="iconLeft"><i className="fas fa-ban"></i></div>
                        <div className="textContainer">
                            <span className="titleContainer">{props.titleMessage}. </span>
                            <span className="messageContainer">{props.customMessage}</span>
                        </div>
                        <div className="alertClose" onClick={() => setDisplay(false)}><i className="fas fa-times"></i></div>
                    </div>
                </div>
            )
        } else if (props.alertType === 'info') {
            return(
                <div className="alertModal" style={{bottom: props.positionBottom + "px"}}>
                    <div className="modalContainer info d-flex">
                        <div className="iconLeft"><i className="fas fa-exclamation-circle"></i></div>
                        <div className="textContainer">
                            <span className="titleContainer">{props.titleMessage} </span>
                            <span className="messageContainer">{props.customMessage}</span>
                        </div>
                        <div className="alertClose" onClick={() => setDisplay(false)}><i className="fas fa-times"></i></div>
                    </div>
                </div>
            )
        } else if (props.alertType === 'question') {
            return(
                <div className="alertModal" style={{bottom: props.positionBottom + "px"}}>
                    <div className="modalContainer info">
                        <div className="d-flex">
                            <div className="iconLeft"><i className="fas fa-exclamation-circle"></i></div>
                            <div className="textContainer">
                                <span className="titleContainer">{props.titleMessage}: </span>
                                <span className="messageContainer">{props.customMessage}</span>
                            </div>
                            <div className="alertClose" onClick={() => setDisplay(false)}><i className="fas fa-times"></i></div>
                        </div>
                        <div className="questionOptions d-flex">
                            <button className="btn btn-active">Si</button>
                            <button className="btn btn-active">No</button>
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
