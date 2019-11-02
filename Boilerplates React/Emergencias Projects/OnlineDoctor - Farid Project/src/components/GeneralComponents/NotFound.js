
import React from 'react';
import {withRouter} from 'react-router-dom';
import {GenericHeader} from './Headers';
import notfound from '../../assets/notfound.png';
import notfoundsec from '../../assets/notfoundcono.png';

const NotFound = (props) => {
    return(
        <>
            <GenericHeader />
            <div className="notfound-container">
                <div className="notfound-code">404</div>
                <img className="notfound-img" src={notfound} alt="No se encontró" />
                <img className="notfound-img-sec" src={notfoundsec} alt="No se encontró" />
                <img className="notfound-img-third" src={notfoundsec} alt="No se encontró" />
                <div className="p-2 mt-5 text-center notFoundFooter">
                    <p className="notfound-text">
                        No se encontró la página que estabas buscando.
                    </p>
                    <br />
                    <small>{props.match ? props.match.params.error : props.error}</small>
                    <button className="btn btn-blue-lg" onClick={() => props.history.push('/')}>Ir a la página inicial</button>
                </div>
            </div>
        </>
    )
}

export default withRouter(NotFound)
