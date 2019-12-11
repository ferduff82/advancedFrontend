
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTimeHour from "./MaterialTimeHour";
import { createDayTime, removeDayTime, editDate } from '../../../store/actions/daytimeActions';
import "../../../styles/doctor/user/Daytime.scss"

const DayTime = (props) => {

    const isValid = useSelector(state => state.daytimes.daytimeStatus.isValid)
    const advancedValidation = useSelector(state => state.daytimes.daytimeStatus.advancedValidation)
    const dayTimes = useSelector(state => state.daytimes.daytimeStatus.dayTimes)
    const indexError = useSelector(state => state.daytimes.daytimeStatus.indexError)
    const dispatch = useDispatch()

    return (
        <div className="DaytimeDataWrapper">
            <div>
                {(dayTimes.length > 0) ?
                    <div className="headWrapper d-flex">
                        <div className="firstColumnHeader">Día</div>
                        <div className="secondColumnHeader">Desde</div>
                        <div className="thirdColumnHeader">Hasta</div>
                        <div className="fourthColumnHeader">Servicio</div>
                        <div className="fifthColumnHeader"></div>
                    </div> : ''}
                <div className="mandatoryFill">{isValid ? '' : <div className="d-block"><div className="d-inline star">*</div><div className="d-inline"> Debe cargar al menos un horario</div></div>}</div>
                <div className="mandatoryFill red">{advancedValidation ? advancedValidation : ''}</div>
                <div className="allTimes">
                    {dayTimes.map((item, index) =>
                        <div key={index} className={(index === indexError) ? 'error wrapperTime' : 'wrapperTime'}>
                            <div>
                                <div className="d-flex addedTime">
                                    <div className="firstColumn">
                                        <select className="form-control"
                                            value={item.day}
                                            onChange={(e) => dispatch(editDate(item.id, 'day', e.target.value, this.props, index))}>
                                            <option value="Lunes">Lunes</option>
                                            <option value="Martes">Martes</option>
                                            <option value="Miércoles">Miércoles</option>
                                            <option value="Jueves">Jueves</option>
                                            <option value="Viernes">Viernes</option>
                                            <option value="Sábado">Sábado</option>
                                            <option value="Domingo">Domingo</option>
                                        </select>
                                    </div>
                                    <div className="secondColumn">
                                        <MaterialTimeHour
                                            dataTime={item.hourFrom}
                                            triggerHourChange={(value) => dispatch(editDate(item.id, 'hourFrom', value, this.props, index))} />
                                    </div>
                                    <div className="thirdColumn">
                                        <MaterialTimeHour
                                            dataTime={item.hourUntil}
                                            triggerHourChange={(value) => dispatch(editDate(item.id, 'hourUntil', value, this.props, index))} />
                                    </div>
                                    <div className="fourthColumn">
                                        <select
                                            className="form-control"
                                            value={item.service}
                                            onChange={(e) => dispatch(editDate(item.id, 'service', e.target.value, this.props, index))}>
                                            <option value="visita-medica">Visita Médica</option>
                                            <option value="consultorio">Consultorio</option>
                                            <option value="online">Online</option>
                                        </select>
                                    </div>
                                    <div className="fifthColumn">
                                        <button className="btn btn-active remove" onClick={() => dispatch(removeDayTime(item.id, dayTimes))}>-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <button className="btn add-daytime btn-active d-block" onClick={() => dispatch(createDayTime(dayTimes))}>+</button>
            </div>
        </div>
    )



}


export default DayTime;
