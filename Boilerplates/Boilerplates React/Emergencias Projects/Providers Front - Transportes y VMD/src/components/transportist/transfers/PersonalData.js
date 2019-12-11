
import React from "react";
import Moment from "moment";

import '../../../styles/transport/PersonalData.scss';

class PersonalData extends React.PureComponent {

    render() {
        console.log(this.props)
        if (this.props.dataInfo) {
            console.log(this.props.dataInfo.provider);
            const { firstname, lastname, cuit, dob, sex, path_profile_pic } = this.props.dataInfo.data.provider;
            console.log(path_profile_pic);

            var newDate = Moment(dob).format("DD/MM/YYYY");

            return (
                <div className="personalDataTransportWrapper">
                    <div className="pictures">
                        {path_profile_pic ? <img src={path_profile_pic} className="personalDataPicture" alt="Face" /> : <i className="fas fa-user personalDataPicture"></i>}
                    </div>
                    <div className="list-container">
                        <div className="name">
                            <div><strong><h5>Datos Personales</h5></strong></div>
                        </div>
                    </div>
                    <div className="list-container">
                        <div className="name">
                            <div><strong>Nombre</strong></div>
                            <div className="nameData">{firstname} {lastname}</div>
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="cuil">
                            <strong>Cuil</strong>
                        </div>
                        <div className="cuilData">
                            {cuit}
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="birth">
                            <strong>Fecha de Nacimiento</strong>
                        </div>
                        <div className="birthData">
                            {newDate}
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="sex">
                            <strong>Sexo</strong>
                        </div>
                        <div className="sexData">
                            {sex === 'M' ? 'Masculino' : 'Femenino'}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default PersonalData;
