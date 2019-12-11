
import React from 'react';
import {withRouter} from 'react-router-dom';
import {Header} from '../../components/global/Header';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import db from "../../config/DBConnection";

const Reset = (props) => {
    React.useEffect(() => {
        db.auth().signOut()
        localStorage.removeItem('userRegistered')
        localStorage.removeItem('userToken')
        localStorage.clear()
    }, [])
    
    const handleReset = () => {
        localStorage.removeItem('userRegistered')
        localStorage.clear()
        props.history.push('/')
    }

    return(
        <>
            <Header>Reset</Header>
            <div className="container">
                <div className="ready-income">
                    <h3><strong>Listo</strong></h3>
                    <div className="checkContainer">
                        <FontAwesomeIcon icon={faCheckCircle} className="iconAdjust"/>
                    </div>
                    <p className="text-center">
                        Haga click en continuar para volver a ingresar.
                    </p>
                </div>
                <div className="buttonContainer">
                    <span className="btn button-reset" onClick={() => handleReset()}>Continuar</span>
                </div>
            </div>
        </>
    )

}

export default withRouter(Reset)
