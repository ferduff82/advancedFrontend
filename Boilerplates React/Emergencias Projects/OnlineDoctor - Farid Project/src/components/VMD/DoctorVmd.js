import React from 'react';
import {Link} from 'react-router-dom';
import pic from '../../assets/profileexpic.jpg';

const WhereVmd = () => {
    return(
       <>
        <div className="vmd-question-card">
            <p className="vmd-question-message"><b>Su médico</b></p>
            <div className="vmd-doctor-image">
                <img src={pic} alt="Doctor" />
            </div>
            <div className="vmd-doctor-data">
                <p><b>Nombre:</b> Gustavo Daquarti</p>
                <p><b>Matrícula: </b>5123123</p>
                <p>Llegará a su domicilio aproximadamente a las <b>20hs</b></p>
                <Link to="/"><button type="button" className="btn btn-send mt-3">Volver</button></Link>
            </div>
        </div>
       </>
    )
}

export default WhereVmd