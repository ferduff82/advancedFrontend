
import React from "react";
import { connect } from "react-redux";

import { triggerCelador } from '../store/actions/frontActions';

import "../styles/components/ProfessionalData.scss"

class ProfessionalData extends React.PureComponent {
    
    render() {

        const { celador } = this.props;

        if (this.props.dataInfo) {

            return (
                <div className="professionalDataWrapper">
                    <div className="d-flex list-container">
                        <div className="matricula">
                            <strong>Tipo de vehículo:</strong>
                        </div>
                        <div className="matriculaData"></div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="especialidad">
                            <strong>N° de plazas:</strong>
                        </div>
                        <div className="especialidadData"></div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="jurisdiccion">
                            <strong>Silla de Ruedas:</strong>
                        </div>
                        <div className="jurisdiccionData"></div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="otros">
                            <strong>Rampa:</strong>
                        </div>
                        <div className="otrosData"></div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="otros">
                            <strong>Patente:</strong>
                        </div>
                        <div className="otrosData"></div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="otros">
                            <strong>Vehículo:</strong>
                        </div>
                        <div className="otrosData">
                            <input type="text" className="form-control" placeholder="Ingrese vehículo"/>
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="otros">
                            <strong>Celador:</strong>
                        </div>
                        <div>
                            <div className="custom-control custom-checkbox mb-3 ml-2 mr-2">
                                <input type="checkbox" className="custom-control-input" id="celador" name="celador" onClick={() => this.props.triggerCelador(celador)}/>
                                <label className="custom-control-label" htmlFor="celador"></label>
                            </div>
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

const mapStateToProps = (state) => {
    return {
        celador: state.front.celador.activate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerCelador: (dataDropdown) => { dispatch(triggerCelador(dataDropdown)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalData);
