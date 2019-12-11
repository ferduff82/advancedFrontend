import React from 'react';
import logo from '../assets/logo.png';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.prevent = this.prevent.bind(this);
     }
     
     prevent(e){   // function upvote
        e.preventDefault();
        return false
     }

    render() {
    return(
        <div>
            <canvas className="background"></canvas>
            <nav className="white" role="navigation">
                <div className="nav-wrapper container red-text">
                <a id="logo-container" href="./" className="brand-logo">
                    <img src={logo} alt="Plataforma inteligente" className="logo" />
                </a>
                <ul className="right hide-on-med-and-down header-menu">
                    <li><a href="./pacientes" className="red-text">PACIENTES</a></li>
                    <li><a href="./medicos" className="blue-text">MEDICOS</a></li>
                    <li><a href="./prepagas" className="green-text">PREPAGAS</a></li>
                    <li><a href="./institucional" className="yellow-text">INSTITUCIONAL</a></li>
                </ul>
                <ul id="nav-mobile" className="sidenav">
                    <li><a href="./">Navbar</a></li>
                </ul>
                    <a href="./" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                </div>
            </nav>
        </div>
    )
}
}

export default Header