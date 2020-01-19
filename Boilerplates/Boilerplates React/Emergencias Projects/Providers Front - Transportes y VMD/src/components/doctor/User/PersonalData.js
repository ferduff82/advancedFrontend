
import React from "react"
import Moment from "moment"
import "../../../styles/doctor/user/PersonalData.scss"

const PersonalData = (props) => {
    const { dataInfo } = props
    if (dataInfo) {
        const { firstname, lastname, cuit, dob, sex, path_profile_pic } = props.dataInfo.provider
        let newDate = Moment(dob).format("DD/MM/YYYY")
        return (
            <div className="personalDataWrapper">
                <div className="d-flex list-container justify-content-between">
                    <div className="pictures">
                        {path_profile_pic ? <img src={path_profile_pic} className="personalDataPicture" alt="Face" /> : <i className="fas fa-user personalDataPicture"></i>}
                    </div>
                    <div className="name">
                        <div><strong>Nombre</strong></div>
                        <div className="nameData">{firstname}</div>
                        <div className="nameData">{lastname}</div>
                    </div>
                </div>
                <div className="d-flex list-container">
                    <div className="cuil">
                        <strong>Cuil:</strong>
                    </div>
                    <div className="cuilData">
                        {cuit}
                    </div>
                </div>
                <div className="d-flex list-container">
                    <div className="birth">
                        <strong>Fecha de Nacimiento:</strong>
                    </div>
                    <div className="birthData">
                        {newDate}
                    </div>
                </div>
                <div className="d-flex list-container">
                    <div className="sex">
                        <strong>Sexo:</strong>
                    </div>
                    <div className="sexData">
                        {sex === 'M' ? 'Masculino' : 'Femenino'}
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalData
