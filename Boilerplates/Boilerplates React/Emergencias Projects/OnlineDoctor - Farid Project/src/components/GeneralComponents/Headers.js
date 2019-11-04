
import React from 'react'
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopMedical } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/logo.png';

export const OnlineDoctorHeader = () => {
    return(
        <>
            <div className="dinamic-logo-container">
                <div className="dinamic-logo">
                    <FontAwesomeIcon icon={faLaptopMedical} />
                </div>
            </div>
            <div className="dinamic-title">Médico Online</div>
        </>
    )
}

export const GenericHeader = (props) => { 
    
    return(
        <>
            <div className="header-container">
                <div className="logo-container">
                    <Link to='/'><div className="logo"><img src={logo} alt="UMA HEALTH" /></div></Link>
                </div>
            </div>
            {props.children && 
            <div className="subheader-container">
                <span className="subheader-title">{props.children}</span>
            </div>}
        </>
    )
}
