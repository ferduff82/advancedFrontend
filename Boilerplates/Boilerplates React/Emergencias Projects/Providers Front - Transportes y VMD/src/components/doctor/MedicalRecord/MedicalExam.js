
import React, { Component } from 'react';
import ValidateInput from '../components/validationComponents/ValidateMedicalExam';

class MedicalExam extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: true,
			temperatura: 0,
			presion_sistolica: 0,
			presion_diastolica: 0,
			heart_rate: 0,
			isAllValid: [],
			inputValidation : {
				motivo_de_consulta: {
					validationFailed: null,
					validationData: false
				},
				epicrisis : {
					validationFailed: null,
					validationData: false
				},
				temperatura : {
					validationFailed: null,
					validationData: false
				},
				presion_sistolica : {
					validationFailed: null,
					validationData: false
				},
				presion_diastolica : {
					validationFailed: null,
					validationData: false
				},
				heart_rate : {
					validationFailed: null,
					validationData: false
				}
			}
		};
	}

	/* General Functions */

	showThisDropdown() {
		this.props.setArrowOpen('examDisplay');
	};

	setBarValue(key, value, mandatory) {
		this.setState({[key]: value});
		this.captureRange(key, value, mandatory);
	}

	captureRange(type, value, mandatory) {
		this.validateInput(type, value, mandatory);
		this.sendDataToPost(type, value);
	}

	/* Push Data to Prepare for Post */

	sendDataToPost(inputKey, value) {
		this.props.sendPostState('medicalExam' ,inputKey , value);
	}

	/* Validate Form */

	validateInput(type, value, mandatory) {
		let validate = ValidateInput(type, value, mandatory);
		this.setState(function(state) { 
			return state.inputValidation[type] = validate
		}, () => { 
			this.isFormCompleted() 
		})
	}

	isFormCompleted() {
		let getState = this.state.inputValidation;
		let anyFalse = Object.keys(getState).filter(function(key) {
			return getState[key].validationFailed === true || getState[key].validationFailed === null;
		});
		(anyFalse.length === 0) ? this.props.isMedicalCompleted(true) : this.props.isMedicalCompleted(false);
		this.setState({
			isAllValid: anyFalse
		}) 
	}

	/* Native React Functions */

	componentDidMount() {

		let isPediatricMandatory = this.props.medicalExamData.user.pediatra;

		/* Set Data for validation if there is any data in GET service */

		if (this.props.medicalExamData.mr.motivo_de_consulta) {
			this.captureRange('motivo_de_consulta', this.props.medicalExamData.mr.motivo_de_consulta)
		}
		if (this.props.medicalExamData.mr.epicrisis) {
			this.captureRange('epicrisis', this.props.medicalExamData.mr.epicrisis)
		}

		if (isPediatricMandatory) { 
			this.captureRange('temperatura', this.props.medicalExamData.mr.temperatura, isPediatricMandatory)
			this.captureRange('presion_sistolica', this.props.medicalExamData.mr.presion_sistolica, isPediatricMandatory)
			this.captureRange('presion_diastolica', this.props.medicalExamData.mr.presion_diastolica, isPediatricMandatory)
			this.captureRange('heart_rate', this.props.medicalExamData.mr.heart_rate, isPediatricMandatory)
		} else {
			if (this.props.medicalExamData.mr.temperatura) {
				this.captureRange('temperatura', this.props.medicalExamData.mr.temperatura)
			}
			if (this.props.medicalExamData.mr.presion_sistolica) {
				this.captureRange('presion_sistolica', this.props.medicalExamData.mr.presion_sistolica)
			}
			if (this.props.medicalExamData.mr.presion_diastolica) {
				this.captureRange('presion_diastolica', this.props.medicalExamData.mr.presion_diastolica)
			}
			if (this.props.medicalExamData.mr.heart_rate) {
				this.captureRange('heart_rate', this.props.medicalExamData.mr.heart_rate)
			}
		}

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.arrowOpen  === 'examDisplay') {
			this.setState({open: false});
		} else {
			this.setState({open: true});
		}
	}

	render() {
		let isPediatricMandatory = this.props.medicalExamData.user.pediatra;
		return (
		  	<div className={this.props.isConsultAborted ? 'hidden medicalExam' : 'medicalExam'}>
		  		<div>
					<div className={this.state.isAllValid.length > 0 
						? "notCompleted mb-3 mb-4 mr-3 ml-3 text-left aditional-height d-flex"
						: "mb-4 mr-3 ml-3 text-left aditional-height d-flex"
					} 
					onClick={() => this.showThisDropdown()}>
						<div className="color-left"></div>
						<div className="mt-2">
							<h6 className="position-absolute">Exámen</h6>
							<div className="w-100">{ this.state.open 
								? <i className="fas fa-plus-circle circle-icon position-absolute"></i> 
								: <i className="fas fa-minus-circle circle-icon float-right position-absolute"></i>
							} </div>
						</div>
					</div>
				</div>
		  		<div className={this.state.open ? 'd-none pt-2 pr-3 pb-3 pl-3 mr-2 ml-2 rounded backForm' : 'pt-2 pr-3 pb-3 pl-3 mr-2 ml-2 rounded backForm'} >
					<div>
						<div className="form-group">
							{ this.state.inputValidation.motivo_de_consulta.validationFailed 
								? <div className="inputError">{this.state.inputValidation.motivo_de_consulta.validationData}</div> 
								: ''
							}
							<label 
								htmlFor="reasonOfConsult">Motivo de consulta {(this.state.inputValidation.motivo_de_consulta.validationFailed || this.state.inputValidation.motivo_de_consulta.validationFailed === null) 
									? <span>*</span> 
									: <i className="fas fa-check"></i>
								}
							</label>
							<input 
								type="text"
								className="form-control" 
								id="reasonOfConsult" 
								list="reason-of-consult" 
								defaultValue={this.props.medicalExamData.mr.motivo_de_consulta} 
								name="reasonOfConsult" 
								onBlur={(e) => this.captureRange('motivo_de_consulta', e.target.value)}
							/>
							<datalist id="reason-of-consult">
								<option value="default" disabled hidden>Seleccionar Motivo de Consulta</option>
								<option value="Alteración aguda de la visión"></option>
								<option value="Alteración de la conducta"></option>
								<option value="Arritmia"></option>
								<option value="Atragantamiento"></option>
								<option value="Calambres"></option>
								<option value="Cianosis"></option>
								<option value="Complicaciones de herida quirúrgica"></option>
								<option value="Constipación"></option>
								<option value="Control de signos vitales"></option>
								<option value="Convulsiones"></option>
								<option value="Cuerpo extraño en orificio natural"></option>
								<option value="Curación"></option>
								<option value="Desmayo"></option>
								<option value="Diagnóstico de...(solicitante médico)"></option>
								<option value="Diarrea"></option>
								<option value="Dificultad para hablar"></option>
								<option value="Dificultad respiratoria"></option>
								<option value="Dolor abdominal"></option>
								<option value="Dolor anal"></option>
								<option value="Dolor cervical"></option>
								<option value="Dolor de boca"></option>
								<option value="Dolor de cabeza"></option>
								<option value="Dolor de extremidad"></option>
								<option value="Dolor de garganta"></option>
								<option value="Dolor de pecho"></option>
								<option value="Dolor en el pecho"></option>
								<option value="Dolor lumbar"></option>
								<option value="Dolor testicular"></option>
								<option value="Dolor toracico"></option>
								<option value="Embarazo con problemas"></option>
								<option value="Epistaxis"></option>
								<option value="Escalofrios"></option>
								<option value="Fiebre"></option>
								<option value="Hemorragia anal"></option>
								<option value="Hemorragia genital"></option>
								<option value="Hemorragia por boca"></option>
								<option value="Hinchazón o edema"></option>
								<option value="Hipertensión arterial"></option>
								<option value="Hipotensión arterial"></option>
								<option value="Ictericia"></option>
								<option value="Ingestion de..."></option>
								<option value="Llanto inconsolable (solo en menores de 3 años)"></option>
								<option value="Malestar general"></option>
								<option value="Mareos"></option>
								<option value="Mordedura"></option>
								<option value="Náuseas"></option>
								<option value="Palidez"></option>
								<option value="Palpitaciones"></option>
								<option value="Paresia"></option>
								<option value="Parestesias"></option>
								<option value="Pérdida de Conciencia"></option>
								<option value="Perdida de control de esfinteres"></option>
								<option value="Picadura"></option>
								<option value="Problema ocular"></option>
								<option value="Problema urinario o genital"></option>
								<option value="Problemas del oido"></option>
								<option value="Quemadura"></option>
								<option value="Reacción cutánea"></option>
								<option value="Sd gripal"></option>
								<option value="Solicitud de precario"></option>
								<option value="Sudoración"></option>
								<option value="Temblor"></option>
								<option value="Tos o expectoración"></option>
								<option value="Trauma de abdomen"></option>
								<option value="Trauma de cara"></option>
								<option value="Trauma de craneo"></option>
								<option value="Trauma de cuello"></option>
								<option value="Trauma de miembro inferior"></option>
								<option value="Trauma de miembro superior"></option>
								<option value="Trauma de pelvis"></option>
								<option value="Trauma de torax"></option>
								<option value="Trauma dorso lumbar"></option>
								<option value="Victima de abuso sexual"></option>
								<option value="Victima de accidente vehicular"></option>
								<option value="Victima de agresión o riña"></option>
								<option value="Victima de ahorcamiento"></option>
								<option value="Victima de caída de altura"></option>
								<option value="Victima de derrumbe o aplastamiento"></option>
								<option value="Victima de electrocución"></option>
								<option value="Victima de explosión"></option>
								<option value="Victima de gases tóxicos"></option>
								<option value="Victima de herida de arma blanca"></option>
								<option value="Victima de herida de arma de fuego"></option>
								<option value="Victima de incendio"></option>
								<option value="Vómitos"></option>
							</datalist>
						</div>
						<div className="form-group">
							{ this.state.inputValidation.epicrisis.validationFailed 
								? <div className="inputError">{this.state.inputValidation.epicrisis.validationData}</div> 
								: ''
							}
							<label 
								htmlFor="epicrisis">Epicrisis {(this.state.inputValidation.epicrisis.validationFailed || this.state.inputValidation.epicrisis.validationFailed === null) 
									? <span>*</span> 
									: <i className="fas fa-check"></i>
								}
							</label>
							<textarea 
								name="epicrisis" 
								className="form-control" 
								id="epicrisis" 
								defaultValue={this.props.medicalExamData.mr.epicrisis} 
								onBlur={(e) => this.validateInput('epicrisis', e.target.value)} 
								onChange={(e) => this.sendDataToPost('epicrisis', e.target.value)}>
							</textarea>
						</div>
						<div className="form-group">
							<label htmlFor="temperatura">Temperatura (°C) {(this.state.inputValidation.temperatura.validationFailed || this.state.inputValidation.temperatura.validationFailed === null) 
									? <span>*</span> 
									: <i className="fas fa-check"></i>
								}
							</label>
							<input 
								type="range" 
								min="25" 
								max="45" 
								step ="0.50" 
								defaultValue={ this.props.medicalExamData.mr.temperatura 
									? this.props.medicalExamData.mr.temperatura 
									: 0 
								} 
								className="custom-range rangeWidth" 
								onChange={(e) => this.setBarValue('temperatura', parseFloat(e.target.value), isPediatricMandatory)} 
								id="temperatura">
							</input>
							<div>{ (this.state.temperatura === 0 && this.props.medicalExamData.mr.temperatura) 
								? this.props.medicalExamData.mr.temperatura 
								: this.state.temperatura}
							</div>
						</div>
						<div className="form-group">
							{ this.state.inputValidation.presion_sistolica.validationFailed 
								? <div className="inputError">{this.state.inputValidation.presion_sistolica.validationData}</div> 
								: ''
							}
							<label 
								htmlFor="presion_sistolica">Presión sistólica (mmHg) {(this.state.inputValidation.presion_sistolica.validationFailed || this.state.inputValidation.presion_sistolica.validationFailed === null) 
									? <span>*</span> 
									: <i className="fas fa-check"></i>
								}
							</label>
							<input 
								type="number" 
								min="0" 
								max="400" 
								className="form-control" 
								placeholder={ this.props.medicalExamData.mr.presion_sistolica 
									? this.props.medicalExamData.mr.presion_sistolica 
									: 0 
								} 
								onChange={ (e) => this.captureRange('presion_sistolica', parseInt(e.target.value), isPediatricMandatory)} 
								id="presion_sistolica">
							</input>
						</div>
						<div className="form-group">
							{ this.state.inputValidation.presion_diastolica.validationFailed 
								? <div className="inputError">{this.state.inputValidation.presion_diastolica.validationData}</div> 
								: ''
							}
							<label 
								htmlFor="presion_diastolica">Presión diastólica (mmHg) {(this.state.inputValidation.presion_diastolica.validationFailed || this.state.inputValidation.presion_diastolica.validationFailed === null) 
									? <span>*</span> 
									: <i className="fas fa-check"></i>
								}
							</label>
							<input 
								type="number" 
								min="0" 
								max="200" 
								className="form-control" 
								placeholder={ this.props.medicalExamData.mr.presion_diastolica 
									? this.props.medicalExamData.mr.presion_diastolica 
									: 0 
								} 
								onChange={(e) => this.captureRange('presion_diastolica', parseInt(e.target.value), isPediatricMandatory)} 
								id="presion_diastolica">	
							</input>
						</div>
						<div className="form-group">
							{ this.state.inputValidation.heart_rate.validationFailed 
								? <div className="inputError">{this.state.inputValidation.heart_rate.validationData}</div> 
								: ''
							}
							<label 
								htmlFor="heart_rate">Frecuencia Cardíaca (mmHg) {(this.state.inputValidation.heart_rate.validationFailed || this.state.inputValidation.heart_rate.validationFailed === null) 
									? <span>*</span> 
									: <i className="fas fa-check"></i>
								}
							</label>
							<input 
								type="number" 
								min="0" 
								max="400" 
								className="form-control" 
								placeholder={ this.props.medicalExamData.mr.heart_rate ? this.props.medicalExamData.mr.heart_rate : '0' } 
								onChange={ (e) => this.captureRange('heart_rate', parseInt(e.target.value), isPediatricMandatory) } 
								id="heart_rate">
							</input>
						</div>
					</div>
				</div>
		  	</div>
		);
	}
}

export default MedicalExam;
