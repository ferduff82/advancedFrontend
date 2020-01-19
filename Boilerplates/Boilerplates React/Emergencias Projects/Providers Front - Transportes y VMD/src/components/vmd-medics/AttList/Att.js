import React from 'react';
import DoctorActions from './DoctorActions'
import 'moment/locale/es';

const Att = (props) => {
    const { request, dts_preds, current_state, provider_id } = props.appointments

    return (
        props.index === 0 && <>
            <div className="patient-card d-flex">
                <div className="d-flex patient-data">
                    <span><b>Hora de la cita: </b>{dts_preds.att.slice(-8, -3)}</span>
                    <span><b>Paciente:</b> {request.firstname}</span>
                    <span><b>Sexo:</b> {request.sex}</span>
                    {request.dob && <span><b>Edad:</b> {request.dob} </span>}
                    <span><b>Dirección:</b> {request.address}</span>
                    {request.intervention !== "0" ? <span><b>Copago:</b> $ {request.intervention} </span> : <><span><b>No hay copago</b> </span></>}
                </div>
            </div>
            <DoctorActions status={current_state} ficha={request.mr_id} dni={request.dni} cuit={provider_id} /> </>
    )
}

export default Att