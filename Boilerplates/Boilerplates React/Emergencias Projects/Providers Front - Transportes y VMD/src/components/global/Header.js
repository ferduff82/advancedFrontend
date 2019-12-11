
import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/logo.png';
import "../../styles/global/Header.scss"

export const Header = (props) => {
    return (
        <>
            <div className="header-container">
                {props.back ? <Link to="/"><FontAwesomeIcon className="mt-2 pt-1" icon={faArrowLeft} /></Link> : ""}
                <div>{props.rol}</div>
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
