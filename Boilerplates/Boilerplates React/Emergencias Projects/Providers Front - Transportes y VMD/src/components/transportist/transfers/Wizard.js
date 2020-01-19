
import React from "react";
import { connect } from "react-redux";
import Axios from 'axios';

import ProfessionalData from './ProfessionalData';
import UploadDocumentation from './UploadDocumentation';
import Daytime from '../../global/Daytime';
import BuildFormData from '../../global/Utilities/BuildFormData';
import SuccessPost from './SuccessPost';

import '../../../styles/transport/Main.scss';
import '../../../styles/transport/Wizard.scss';

class WizardComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            wizardStatus: 0,
            loadingSubmit: null
        }
    }

    setWizardStatus(value) {
        this.setState({
            wizardStatus: value
        })
    }

    validateForm() {
        var isFormValid = false;
        if (this.props.tipoDeVehiculo && this.props.tipoDeVehiculo !== 'undefined' &&
            this.props.numeroPlazas && this.props.numeroPlazas !== 'undefined' &&
            this.props.patente && this.props.patente !== 'undefined' &&
            this.props.vehiculo && this.props.vehiculo !== 'undefined') {
            isFormValid = true;
        }
        console.log(isFormValid);
        return isFormValid;
    }

    submitData() {

        let formDataBuilt = BuildFormData();

        this.setState({ loadingSubmit: 'loading' })

        const config = { headers: { 'content-type': 'multipart/form-data' } };

        Axios.post("https://providers-dot-uma-v2.appspot.com/" + localStorage.getItem("userCuil") + "/alta_submission", formDataBuilt, config)
            .then((response) => {
                this.setState({ loadingSubmit: 'success' })
            }).catch((error) => {
                this.setState({ loadingSubmit: 'failed' })
            });
    }

    render() {
        if (this.state.loadingSubmit) {
            return (
                <SuccessPost dataSuccess={this.state.loadingSubmit} />
            )
        } else {
            return (
                <div className="wizard">
                    <div className="backgroundWizard"></div>
                    <div className="wizardContainer">
                        {this.WizardDisplay()}
                    </div>
                </div>
            )
        }
    }

    /* Wizard Status Component */

    WizardDisplay() {
        if (this.state.wizardStatus === 0) {
            return (
                <div className="firstScreen">
                    <div className="wizardHeader">
                        <h3 className="text-center">Bienvenido!</h3>
                    </div>
                    <div className="textInitialContainer">
                        <p className="text-center">Complete sus datos profesionales para comenzar.</p>
                    </div>
                    <div className="beginContainer">
                        <button className="btn btn-active w-100" onClick={() => this.setWizardStatus(1)}>Comenzar</button>
                    </div>
                </div>
            );
        } else if (this.state.wizardStatus === 1) {
            return (
                <div className="secondScreen">
                    <div className="titleInstructions text-center">Complete los datos del vehículo</div>
                    <div className="secondScreenHeader d-flex justify-content-center">
                        <div className="stepOne">1</div>
                        <div className="stepTwo">2</div>
                        <div className="stepFinal">3</div>
                    </div>
                    <ProfessionalData />
                    <div className="continueContainer">
                        {this.validateForm() ?
                            <button className="btn btn-active w-100" onClick={() => this.setWizardStatus(2)}>Siguiente</button>
                            :
                            <button className="btn btn-active w-100 disabled">Siguiente</button>
                        }
                    </div>
                </div>
            );
        } else if (this.state.wizardStatus === 2) {
            return (
                <div className="thirdScreen">
                    <div className="titleInstructions text-center">Agregar Horarios laborales</div>
                    <div className="thirdScreenHeader d-flex justify-content-center">
                        <div className="stepOne">1</div>
                        <div className="stepTwo">2</div>
                        <div className="stepFinal">3</div>
                    </div>
                    <Daytime dataInfo={this.props.dataInfo} />
                    <div className="continueContainer">
                        {this.props.isDaytimeValid && !this.props.advancedDaytimeValidation ?
                            <button className="btn btn-active w-100" onClick={() => this.setWizardStatus(3)}>Siguiente</button>
                            :
                            <button className="btn btn-active w-100 disabled">Siguiente</button>
                        }
                        <button className="btn btn-active w-100" onClick={() => this.setWizardStatus(1)}>Volver</button>
                    </div>
                </div>
            )
        } else if (this.state.wizardStatus === 3) {
            return (
                <div className="finalScreen">
                    <div className="titleInstructions text-center">Agregar documentación</div>
                    <div className="finalScreenHeader d-flex justify-content-center">
                        <div className="stepOne">1</div>
                        <div className="stepTwo">2</div>
                        <div className="stepFinal">3</div>
                    </div>
                    <UploadDocumentation dataInfo={this.props.dataInfo} />
                    <div className="continueContainer">
                        <button className="btn btn-finish w-100" onClick={() => this.submitData()}>Finalizar</button>
                        <button className="btn btn-active w-100" onClick={() => this.setWizardStatus(2)}>Volver</button>
                    </div>
                </div>
            )
        }
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
        celador: state.professionalsData.celador.activate,
        isDaytimeValid: state.daytimes.daytimeStatus.isValid,
        advancedDaytimeValidation: state.daytimes.daytimeStatus.advancedValidation
    }
}

export default connect(mapStateToProps, null)(WizardComponent);
