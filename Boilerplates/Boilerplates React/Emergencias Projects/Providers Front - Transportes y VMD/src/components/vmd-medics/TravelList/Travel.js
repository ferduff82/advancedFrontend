import React from 'react';
import 'moment/locale/es';
import Map from '../GeneralComponents/Maps'
// import DoctorActions from './DoctorActions'

const Transfer = (props) => {
    const {request, dts_preds, current_state, provider_id } = props.appointments

    return (
            props.index === 0 && <>
            <div className="patient-card d-flex">
                <div className="d-flex patient-data">
                    <span><b>Hora de la cita: </b>{dts_preds.att.slice(-8, -3)}</span>
                    <span><b>Dirección:</b> {request.address}</span>
                    <div className="travel-map">
                        <Map origin="Amenabar 3630" destination={request.address}/>
                    </div>
                </div>
            </div>
            {/* <DoctorActions status={current_state} ficha={request.mr_id} dni={request.dni} cuit={provider_id}/>*/} 
            </> 
    )
}

export default Transfer