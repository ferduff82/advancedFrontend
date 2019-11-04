
import React from "react";

import "../styles/components/PersonalData.scss"

class PersonalData extends React.PureComponent {

    render() {

        if (this.props.dataInfo) {

            const { firstname, cuit, dob, sex, path_profile_pic } = this.props.dataInfo.provider;
            console.log(this.props.dataInfo.provider);
            console.log(path_profile_pic );
            return (
                <div className="personalDataWrapper">
                    <div className="d-flex list-container">
                        <div className="pictures">
                            {path_profile_pic ? <img src={path_profile_pic} className="personalDataPicture" alt="Face"/> : <i className="fas fa-user personalDataPicture"></i>}
                        </div>
                        <div className="name">
                            <div><strong>- Nombre:</strong></div>
                            <div>{ firstname }</div>
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="cuil">
                            <strong>- Cuil:</strong>
                        </div>
                        <div className="cuilData">
                            { cuit }
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="birth">
                            <strong>- Fecha de Nacimiento:</strong>
                        </div>
                        <div className="birthData">
                            { dob }
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="sex">
                            <strong>- Sexo:</strong>
                        </div>
                        <div className="sexData">
                            { sex === 'M' ? 'Male' : 'Female'}
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
