
import React from "react";
import { connect } from "react-redux";
import RandomId from "./RandomId";
import MaterialTimeHour from "./MaterialTimeHour";
import { validateDaytime } from '../store/actions/validateActions';

import "../styles/components/Daytime.scss"

class HolidaysData extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { 
            dayEvents: []
        }
    }

    _createInput() {

        const createRandomId = RandomId();

        const element = (
            <div>
                <div className="d-flex addedTime">
                    <div className="firstColumn">
                    <select className="form-control">
                        <option value="Lunes">Lunes</option>
                        <option value="Martes">Martes</option>
                        <option value="Miércoles">Miércoles</option>
                        <option value="Jueves">Jueves</option>
                        <option value="Viernes">Viernes</option>
                        <option value="Sábado">Sábado</option>
                        <option value="Domingo">Domingo</option>
                    </select>
                    </div>
                    <div className="secondColumn"><MaterialTimeHour/></div>
                    <div className="fourthColumn"><MaterialTimeHour/></div>
                    <div className="fifthColumn">
                        <button className="btn btn-active remove" onClick={(e) => this._removeItem(e)} data-id={createRandomId}>-</button>
                    </div>
                </div>
            </div>
        );
        this.setState(prevState => ({
            dayEvents: [...prevState.dayEvents, {
                dom: element,
                randomId: createRandomId
            }]
        }), () => this.props.validateDaytime(this.state.dayEvents.length))
    }

    _removeItem(e) {
        var getDataId = e.target.getAttribute('data-id'),
            filterArray = this.state.dayEvents.filter(function(event, index) {
            return getDataId !== event.randomId;
        })
        this.setState({
            dayEvents: filterArray
        }, () => this.props.validateDaytime(this.state.dayEvents.length));
    }

    render() {

        const { isDaytimeValid } = this.props;

        return (
            <div className="DaytimeDataWrapper">
                <div>
                    <button className="btn btn-active" onClick={() => this._createInput()}>Agregar horario +</button>
                </div>
                <div>
                    {(this.state.dayEvents.length > 0) ? <div className="headWrapper d-flex">
                        <div className="firstColumn"></div>
                        <div className="secondColumn">Desde</div>
                        <div className="fourthColumn">Hasta</div>
                        <div className="fifthColumn"></div>
                    </div> : ''}
                    <div>{isDaytimeValid ? '' : 'Debe cargar al menos un horario' }</div>
                    <div>
                        {this.state.dayEvents.map((item, index) => 
                            <div key={index}>{item.dom}</div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDaytimeValid: state.validate.dayTimeIsNotEmpty.isValid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        validateDaytime: (checkData) => { dispatch(validateDaytime(checkData)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HolidaysData);
