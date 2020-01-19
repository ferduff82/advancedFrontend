
import React from "react";
import { connect } from "react-redux";
import Switch from 'react-switch';

import { triggerCelador, inputProfessionals } from '../../../store/actions/transport/profesionalsActions';

import "../../../styles/transport/ProfessionalData.scss";

class ProfessionalData extends React.PureComponent {
    
    render() {

        const { tipoDeVehiculo, numeroPlazas, sillaDeRuedas, rampa, patente, vehiculo, celador } = this.props;

        console.log( tipoDeVehiculo, numeroPlazas, sillaDeRuedas, rampa, patente, vehiculo, celador );

        return (
            <div className="professionalDataWrapper">
                <div className="list-container">
                    <div className="matricula">
                        <strong>Tipo de vehículo</strong>
                        <span className="mandatory">
                            {tipoDeVehiculo !== null && tipoDeVehiculo !== undefined && tipoDeVehiculo !== "" && tipoDeVehiculo !== 'undefined' && tipoDeVehiculo !== false ? '' : 'Obligatorio *'}
                        </span>
                    </div>
                    <div className="matriculaData">
                        <select className="form-control" 
                            value={tipoDeVehiculo !== 'select' ? tipoDeVehiculo : 'select' } 
                            onChange={(e) => this.props.inputProfessionals('TRIGGER_TIPO_VEHICULO', e.target.value)}>
                                <option value="select" disabled hidden>Seleccionar tipo de vehículo</option>
                                <option value="remis">Remis</option>
                                <option value="remis-cordoba">Remis Córdoba</option>
                        </select>
                    </div>
                </div>
                <div className="list-container">
                    <div className="especialidad">
                        <strong>N° de plazas</strong>
                        <span className="mandatory">
                            {numeroPlazas !== null && numeroPlazas !== undefined && numeroPlazas !== "" && numeroPlazas !== 'undefined' && numeroPlazas !== false ? '' : 'Obligatorio *'}
                        </span>
                    </div>
                    <div className="especialidadData">
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder={numeroPlazas === '' || numeroPlazas === 'undefined' ? "Ingrese número de plazas" : numeroPlazas}
                            onChange={(e) => this.props.inputProfessionals('TRIGGER_NUMERO_PLAZAS', e.target.value)}
                        />
                    </div>
                </div>
                <div className="list-container d-flex">
                    <div className="column-list">
                        <div className="jurisdiccion">
                            <strong>Silla de Ruedas</strong>
                        </div>
                        <div className="jurisdiccionData">
                            <Switch 
                                type="checkbox" 
                                checked={sillaDeRuedas} 
                                onChange={() => this.props.inputProfessionals('TRIGGER_SILLA', !sillaDeRuedas)}
                            />
                        </div>
                    </div>
                    <div className="column-list ml-4">
                        <div className="otros">
                            <strong>Rampa</strong>
                        </div>
                        <div className="otrosData">
                            <Switch 
                                type="checkbox" 
                                checked={rampa} 
                                onChange={() => this.props.inputProfessionals('TRIGGER_RAMPA', !rampa)}
                            />
                        </div>
                    </div>
                </div>
                <div className="list-container">
                    <div className="otros">
                        <strong>Patente</strong>
                        <span className="mandatory">
                            {patente !== null && patente !== undefined && patente !== "" && patente !== 'undefined' && patente !== false ? '' : 'Obligatorio *'}
                        </span>
                    </div>
                    <div className="otrosData">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder={patente === '' || patente === 'undefined' ? "Ingrese la patente" : patente}
                            onChange={(e) => this.props.inputProfessionals('TRIGGER_PATENTE', e.target.value)}
                        />
                    </div>
                </div>
                <div className="list-container">
                    <div className="otros">
                        <strong>Modelo de vehículo</strong>
                        <span className="mandatory">
                            {vehiculo !== null && vehiculo !== undefined && vehiculo !== "" && vehiculo !== 'undefined' && vehiculo !== false ? '' : 'Obligatorio *'}
                        </span>
                    </div>
                    <div className="otrosData">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder={vehiculo === '' || vehiculo === 'undefined' ? "Ingrese el modelo" : vehiculo}
                            onChange={(e) => this.props.inputProfessionals('TRIGGER_VEHICULO', e.target.value)}
                        />
                    </div>
                </div>
                <div className="d-flex list-container mt-4">
                    <div className="otros">
                        <strong>Celador</strong>
                    </div>
                    <div>
                        <div className="custom-control custom-checkbox mb-1 ml-2 mr-2">
                            <Switch 
                                type="checkbox" 
                                id="celador" 
                                name="celador" 
                                checked={celador} 
                                onChange={() => this.props.triggerCelador(!celador)}
                            />
                            <label htmlFor="celador"></label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tipoDeVehiculo: state.professionalsData.tipoDeVehiculo,
        numeroPlazas: state.professionalsData.numeroPlazas,
        sillaDeRuedas: state.professionalsData.sillaDeRuedas,
        rampa: state.professionalsData.rampa,
        patente: state.professionalsData.patente,
        vehiculo: state.professionalsData.vehiculo,
        celador: state.professionalsData.celador.activate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerCelador: (dataCelador) => { dispatch(triggerCelador(dataCelador)) },
        inputProfessionals: (inputType, dataInput) => { dispatch(inputProfessionals(inputType, dataInput)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalData);
