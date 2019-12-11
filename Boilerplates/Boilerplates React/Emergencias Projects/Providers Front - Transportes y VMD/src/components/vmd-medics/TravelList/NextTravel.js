import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { Header } from '../GeneralComponents/Header';

const NextAtts = (props) => {
    const dispatch = useDispatch()
    const assignations = useSelector((state) => state.assign.all)

    return (
        <>
            <div className="appointments-next-container">
                <Header>Próximos viajes</Header>
                <div className="d-flex justify-content-around">
                    <span className="btn btn-blue m-3" onClick={() => dispatch({ type: 'VIEW_NEXT_ATTENTIONS' })}>Ocultar viajes en espera</span>
                </div>
                <div className="date-container">
                    <span className="apppointments-date"><b>{moment(new Date()).format('LLLL')}</b></span>
                </div>
                <div className="col-xs-12 d-flex justify-content-around">
                    <div className="appointments-next">
                        {assignations && assignations.length <= 1 ?
                            <div className="patient-next-data">
                                <small className="d-flex justify-content-between p-2">Te avisaremos para tu próximo viaje</small>
                            </div>
                            : <></>}
                        {assignations && assignations.length > 1 ? assignations.slice(1).map((appoint, index) =>
                            <div className="patient-card d-flex" key={index}>
                                <div className="d-flex patient-next-data w-100">
                                    <span><b>Viajes en cola {props.index}.</b> Hora de la cita estimada para las {appoint.dts_preds.att.slice(-8, -3)}</span>
                                </div>
                            </div>) : <></>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NextAtts