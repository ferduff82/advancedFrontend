import React from 'react';
import QR from '../assets/QR.png';

const Footer = () => {
    return(   
    <footer className="page-footer">
        <div className="container">
            <div className="row">
            <div className="col l6 s12">
            <h5 className="white-text">Usa UMA</h5>
                <ul>
                    <img src={QR} alt="Escanea el QR para usar UMA" />
                </ul>
            </div>
            <div className="col l3 s6">
                <h5 className="white-text">Empresa</h5>
                <ul>
                <li><a className="white-text" href="./terminos">Términos y condiciones</a></li>
                <li><a className="white-text" href="./">Pacientes</a></li>
                <li><a className="white-text" href="./">Médicos</a></li>
                <li><a className="white-text" href="./">Prepagas</a></li>
                </ul>
            </div>
            <div className="col l3 s6">
                <h5 className="white-text">Connect</h5>
                <ul>
                <li><a className="white-text" href="./">Link 1</a></li>
                <li><a className="white-text" href="./">Link 2</a></li>
                <li><a className="white-text" href="./">Link 3</a></li>
                <li><a className="white-text" href="./">Link 4</a></li>
                </ul>
            </div>
            <div className="col l3 s6">

            </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container">
            
            </div>
        </div>
    </footer>
    )
}

export default Footer;