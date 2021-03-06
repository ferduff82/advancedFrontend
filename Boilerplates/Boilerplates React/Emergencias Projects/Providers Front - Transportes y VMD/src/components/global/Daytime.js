
import React from "react";
import { connect } from "react-redux";
import MaterialTimeHour from "./Utilities/MaterialTimeHour";
import { createDayTime, removeDayTime, editDate } from '../../store/actions/transport/daytimeActions';

import "../../styles/global/Daytime.scss";

class DayTime extends React.PureComponent {

    render() {

        const { _isValid } = this.props;
        const { _dayTimes } = this.props;
        const { _indexError } = this.props;
        const { _advancedValidation } = this.props;

        console.log(_indexError);

        return (
            <div className="DaytimeDataWrapper">
                <div>
                    {(_dayTimes.length > 0) ? <div className="headWrapper d-flex">
                        <div className="firstColumnHeader">Día</div>
                        <div className="secondColumnHeader">Desde</div>
                        <div className="thirdColumnHeader">Hasta</div>
                        <div className="fourthColumnHeader">Servicio</div>
                        <div className="fifthColumnHeader"></div>
                    </div> : ''}
                    <div className="mandatoryFill">{ _isValid ? '' : <div className="d-block"><div className="d-inline star">*</div><div className="d-inline"> Debe cargar al menos un horario</div></div> }</div>
                    <div className="mandatoryFill red">{ _advancedValidation ? _advancedValidation : '' }</div>
                    <div className="allTimes">
                        {_dayTimes.map((item, index) => 
                            <div key={index} className={(index === _indexError) ? 'error wrapperTime' : 'wrapperTime' }>
                                <div>
                                    <div className="d-flex addedTime">
                                        <div className="firstColumn">
                                            <select className="form-control" 
                                                value={item.day} 
                                                onChange={(e) => this.props._editDate(item.id, 'day', e.target.value, this.props, index)}>
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
                                                triggerHourChange={(value) => this.props._editDate(item.id, 'hourFrom', value, this.props, index)}/>
                                        </div>
                                        <div className="thirdColumn">
                                            <MaterialTimeHour 
                                                dataTime={item.hourUntil} 
                                                triggerHourChange={(value) => this.props._editDate(item.id, 'hourUntil', value, this.props, index)}/>
                                        </div>
                                        <div className="fourthColumn">
                                            <select 
                                                className="form-control" 
                                                value={item.service} 
                                                onChange={(e) => this.props._editDate(item.id, 'service', e.target.value, this.props, index)}>
                                                    <option value="visita-medica">Visita Médica</option>
                                                    <option value="consultorio">Consultorio</option>
                                                    <option value="online">Online</option>
                                            </select>
                                        </div>
                                        <div className="fifthColumn">
                                            <button className="btn btn-active remove" onClick={() => this.props._removeDayTime(item.id, _dayTimes)}>-</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <button className="btn add-daytime btn-active d-block" onClick={() => this.props._createDayTime(_dayTimes)}>+</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _isValid: state.daytimes.daytimeStatus.isValid,
        _advancedValidation: state.daytimes.daytimeStatus.advancedValidation,
        _dayTimes: state.daytimes.daytimeStatus.dayTimes,
        _indexError: state.daytimes.daytimeStatus.indexError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        _editDate: (id, valueType, valueDay, valueTime, daytimes, index) => { 
            dispatch(editDate(id, valueType, valueDay, valueTime, daytimes, index)) 
        },
        _createDayTime: (daytimes) => { dispatch(createDayTime(daytimes)) },
        _removeDayTime: (id, daytimes) => { dispatch(removeDayTime(id, daytimes)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DayTime);
