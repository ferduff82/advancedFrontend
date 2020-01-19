
import React from 'react';
import {useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Header} from './Header';
import notfound from '../../assets/notfound.png';
import notfoundsec from '../../assets/notfoundcono.png';

const NotFound = (props) => {
    const error = useSelector(state => state.front.error)
    return(
        <>
            <Header />
            <div className="notfound-container">
                <div className="notfound-code">404</div>
                <img className="notfound-img" src={notfound} alt="No se encontró" />
                <img className="notfound-img-sec" src={notfoundsec} alt="No se encontró" />
                <img className="notfound-img-third" src={notfoundsec} alt="No se encontró" />
                <div className="p-2 mt-5 text-center notFoundFooter">
                    {error && error !== "" ?
                    <p className="notfound-text">{error}</p>
                :
                    <p className="notfound-text">
                        No se encontró la página que estabas buscando.
                    </p>
                    }
                    <br />
                    <small>{props.match ? props.match.params.error : props.error}</small>
                    <button className="btn btn-blue-lg" onClick={() => props.history.push('/')}>Ir a la página inicial</button>
                </div>
            </div>
        </>
    )
}

export default withRouter(NotFound)
