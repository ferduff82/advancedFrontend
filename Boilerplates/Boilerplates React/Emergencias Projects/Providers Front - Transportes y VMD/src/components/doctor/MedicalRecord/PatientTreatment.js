
import React, { Component } from 'react';
import ModalGDUH from './ModalGDUH';
import Datalist from './Datalist'
import ValidateInput from '../components/validationComponents/ValidatePatientTreatment';
import '../styles/PatientTreatment.scss';

class PatientTreatment extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: true,
			isAborted: false,
			displayModal: false,
			gduh: '',
			isAllValid: [],
			inputValidation : {
				tratamiento: {
					validationFailed: null,
					validationData: false
				},
				gduh : {
					validationFailed: null,
					validationData: false
				},
				diagnostico : {
					validationFailed: null,
					validationData: false
				},
				destino_final : {
					validationFailed: null,
					validationData: false
				}
			}
		};
	}

	/* General Functions */

	showThisDropdown() {
		this.props.setArrowOpen('treatmentDisplay');
	};

	anulaPaciente(selectedValue) {
		if (selectedValue === 'Anula paciente' ||
			selectedValue === 'Anula por asistencia de otro sistema' ||
			selectedValue === 'Anula por domicilio inexistente' ||
			selectedValue === 'Anula por paciente ausente' ||
			selectedValue === 'Anula por rechazo de asistencia' ||
			selectedValue === 'Paciente no contactado') {
			this.props.isConsultAborted(true);
			this.setState({isAborted: true});
			this.props.cleanUpTreatment(selectedValue);
			this.clearInputValues()
		} else {
			this.props.isConsultAborted(false);
			this.setState({isAborted: false});
		}
	}

	clearInputValues() {
		let that = this,
			getState = this.state.inputValidation;

		this.refs.tratamiento.value = '';
		this.refs.diagnostico.value = '';
		this.refs.observations.value = '';
		this.setState({
			gduh: ''
		});
		Object.keys(getState).map(function(key) {
			if (key !== 'destino_final') {
				that.setState(function(state) { 
					return state.inputValidation[key].validationFailed = false
				}, () => { 
					that.validateInput(key, that.state.inputValidation[key].validationFailed)
				})
			}
		})
	}

	settingUrgency(value) {
		this.setState({gduh: value})
		this.validateInput('gduh', value);
		this.sendDataToPost('gduh', value);
	}

	displayModal(value) {
		this.validateInput('gduh', this.state.gduh);
		this.setState({displayModal: value});
	}

	captureDropdowns(type, value) {
		this.validateInput(type, value);
		this.sendDataToPost(type, value);
	}

	/* Push Data to Prepare for Post */

	sendDataToPost(inputKey, value) {
		this.props.sendPostState('patientTreatment' ,inputKey , value);
	}

	/* Validate Form */

	validateInput(type, value) {
		let validate = ValidateInput(type, value);
		this.setState(function(state) { 
			return state.inputValidation[type] = validate
		}, () => { 
			this.isFormCompleted() 
		})
	}

	isFormCompleted() {
		let getState = this.state.inputValidation;
		var anyFalse = '';

		if (this.state.isAborted) {
			anyFalse = Object.keys(getState).filter(function(key) {
				var validateDestination = '';
				if (key === 'destino_final') {
					validateDestination = getState[key].validationFailed === true || getState[key].validationFailed === null;
				}
				return validateDestination;
			});
			(anyFalse.length === 0) ? this.props.isMedicalCompleted(true) : this.props.isMedicalCompleted(false);
		} else {
			anyFalse = Object.keys(getState).filter(function(key) {
				return getState[key].validationFailed === true || getState[key].validationFailed === null;
			});
		}
		(anyFalse.length === 0) ? this.props.isTreatmentCompleted(true) : this.props.isTreatmentCompleted(false);
		this.setState({
			isAllValid: anyFalse
		}) 
	}
	
	/* Native React Functions */

	componentDidMount() {

		/* Set Data for validation if there is any data in GET service */

		if (this.props.patientTreatmentData.mr.tratamiento) {
			this.captureDropdowns('tratamiento', this.props.patientTreatmentData.mr.tratamiento)
		}
		if (this.props.patientTreatmentData.mr.gduh) {
			this.captureDropdowns('gduh', this.props.patientTreatmentData.mr.gduh)
		}
		if (this.props.patientTreatmentData.mr.diagnostico) {
			this.captureDropdowns('diagnostico', this.props.patientTreatmentData.mr.diagnostico)
		}
		if (this.props.patientTreatmentData.mr.destino_final) {
			this.anulaPaciente(this.props.patientTreatmentData.mr.destino_final);
			this.captureDropdowns('destino_final', this.props.patientTreatmentData.mr.destino_final)
		}
		if (!this.state.gduh) {
			this.setState({gduh: this.props.patientTreatmentData.mr.gduh});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.arrowOpen  === 'treatmentDisplay') {
			this.setState({open: false});
		} else {
			this.setState({open: true});
		}
	}

	moveTypeToEnd(e) {
		var getInputLength = e.target.value,
			getInput = document.getElementById('diag');

		e.target.value = ''; 
		e.target.value = getInputLength;
	}

	render() {
		return (
		  	<div className="patientTreatment">
				{this.state.displayModal ? <ModalGDUH hiddeShowModal={() => this.displayModal(false)} setUrgency={(e) => this.settingUrgency(e)}/> : ''}
		  		<div>
				  	<div className={this.state.isAllValid.length > 0 
						? "notCompleted mb-3 mb-4 mr-3 ml-3 text-left aditional-height d-flex"
						: "mb-4 mr-3 ml-3 text-left aditional-height d-flex"
					}  
					onClick={() => this.showThisDropdown()}>
				  		<div className="color-left"></div>
						<div className="mt-2">
							<h6 className="position-absolute">Cierre</h6>
							<div className="w-100">{this.state.open ? <i className="fas fa-plus-circle circle-icon position-absolute"></i> : <i className="fas fa-minus-circle circle-icon float-right position-absolute"></i>}</div>
						</div>
					</div>
				</div>
				<div className={this.state.open ? 'd-none pt-2 pr-3 pb-3 pl-3 mr-2 ml-2 rounded backForm' : 'pt-2 pr-3 pb-3 pl-3 mr-2 ml-2 rounded backForm'} >
					<div>
						<div className={ this.state.isAborted ? 'hidden form-group' : 'form-group'}>
							<div className="form-group">
								{this.state.inputValidation.tratamiento.validationFailed ? <div className="inputError">{this.state.inputValidation.tratamiento.validationData}</div> : ''}
								<label htmlFor="tratamiento">Tratamiento {(this.state.inputValidation.tratamiento.validationFailed || this.state.inputValidation.tratamiento.validationFailed === null) ? <span>*</span> : <i className="fas fa-check"></i>}</label>
								<input type="text" className="form-control" id="tratamiento" ref='tratamiento' defaultValue={this.props.patientTreatmentData.mr.tratamiento} onBlur={(e) => this.validateInput('tratamiento', e.target.value)} onChange={(e) => this.sendDataToPost('tratamiento', e.target.value)}></input>
							</div>
							<div className="form-group">
								{this.state.inputValidation.gduh.validationFailed ? <div className="inputError">{this.state.inputValidation.gduh.validationData}</div> : ''}
								<label htmlFor="gduh">GDUH {(this.state.inputValidation.gduh.validationFailed || this.state.inputValidation.gduh.validationFailed === null) ? <span>*</span> : <i className="fas fa-check"></i>}</label>
								<input type="text" className="form-control gdhu" id="gduh" onClick={() => this.displayModal(true)} defaultValue={ this.state.gduh } readOnly></input>
							</div>
							<div className="form-group">
							{this.state.inputValidation.diagnostico.validationFailed ? <div className="inputError">{this.state.inputValidation.diagnostico.validationData}</div> : ''}
								<label htmlFor="diagnostico">Diagnóstico {(this.state.inputValidation.diagnostico.validationFailed || this.state.inputValidation.diagnostico.validationFailed === null) ? <span>*</span> : <i className="fas fa-check"></i>}</label>
								<input type="text" id="diag" className="form-control" ref='diagnostico' list="diagnostico" defaultValue={this.props.patientTreatmentData.mr.diagnostico} onBlur={(e) => this.captureDropdowns('diagnostico', e.target.value)} onFocus={(e) =>this.moveTypeToEnd(e)}/>
								<datalist id="diagnostico">
									<option value="Atención de enfermería"></option>
									<option value="CARV Accidente cerebrovasclar/ictus/apoplejía 301"></option>
									<option value="CARV Arritmia cardíaca NE 304"></option>
									<option value="CARV Choque, no clasificado en otra parte 307"></option>
									<option value="CARV Dolor cardíaco/atribuido corazón 320"></option>
									<option value="CARV Elevación de la presión arterial 329"></option>
									<option value="CARV Flebitis y tromboflebitis 339"></option>
									<option value="CARV Hipotensión sin especificar 345"></option>
									<option value="CARV Infarto agudo de miocardio 347"></option>
									<option value="CARV Insuficiencia cardíaca 349"></option>
									<option value="CARV Isquemia cardíaca con angina 351"></option>
									<option value="CARV Isquemia cardíaca sin angina 352"></option>
									<option value="CARV Otros signos/síntomas cardiovasculares 466"></option>
									<option value="CARV Parada cardiorrespiratoria 481"></option>
									<option value="DERM Otros signos/síntomas de la piel y faneras 467"></option>
									<option value="DERM Salpullido y otras erupciones cutáneas no especificadas 487"></option>
									<option value="DERM Tumefacción, masa o prominencia de la piel y del tejido subcutáneo localizadas 504"></option>
									<option value="DIGES Abdomen agudo 300"></option>
									<option value="DIGES Cuerpo extraño en tracto digestivo 311"></option>
									<option value="DIGES Diarrea 317"></option>
									<option value="DIGES Dispepsia/indigestión 318"></option>
									<option value="DIGES Dolor abdominal generalizado/retortijones 319"></option>
									<option value="DIGES Dolor de estómago/epigástrico 321"></option>
									<option value="DIGES Estreñimiento 334"></option>
									<option value="DIGES Hematemesis/vómito de sangre 341"></option>
									<option value="DIGES Ictericia 346"></option>
									<option value="DIGES Melena 356"></option>
									<option value="DIGES Otros dolores abdominales localizados 469"></option>
									<option value="DIGES Otros signos/síntomas del aparato digestivo 468"></option>
									<option value="DIGES Rectorragia/hemorragia rectal 484"></option>
									<option value="DIGES Signos/síntomas de boca, lengua y labios 491"></option>
									<option value="DIGES Signos/síntomas de dientes y encías 493"></option>
									<option value="DIGES Vómito 506"></option>
									<option value="EMBAR Hemorragia antes del parto 343"></option>
									<option value="EMBAR Otros problemas/enfermedades del embarazo/parto 470"></option>
									<option value="EMBAR Signos/síntomas de la mama/lactancia 496"></option>
									<option value="EMBAR Vómito/náusea del embarazo 507"></option>
									<option value="GENIT Dolor genital femenino 324"></option>
									<option value="GENIT Orquitis/epididimitis 461"></option>
									<option value="GENIT Otros signos/síntomas del aparato genital del hombre 471"></option>
									<option value="GENIT Otros signos/síntomas genital/mamas, mujer 472"></option>
									<option value="GENIT Sangrado intermenstrual 488"></option>
									<option value="GENIT Sangrado posmenopáusico 489"></option>
									<option value="HEMAT Adenopatía/dolor en ganglio linfático 302"></option>
									<option value="HEMAT Púrpura/alteraciones de la coagulación 483"></option>
									<option value="HEMAT Signos/síntomas de la sangre/órganos hematopoyéticos 497"></option>
									<option value="INESP Alergia/reacciones alérgicas NE 303"></option>
									<option value="INESP Desmayo/síncope 316"></option>
									<option value="INESP Dolor generalizado/múltiple 323"></option>
									<option value="INESP Dolor torácico NE 325"></option>
									<option value="INESP Edema, no clasificado en otra parte 326"></option>
									<option value="INESP Escalofríos 332"></option>
									<option value="INESP Fiebre 338"></option>
									<option value="INESP Otras enfermedades infecciosas NE 462"></option>
									<option value="INESP Otras enfermedades virales con exantema 465"></option>
									<option value="INESP Otros problemas sociales 479"></option>
									<option value="INESP Somnolencia, estupor y coma 501"></option>
									<option value="LOCOM Esguinces y distensiones NE 333"></option>
									<option value="LOCOM Otros signos/síntomas del aparato locomotor 473"></option>
									<option value="LOCOM Signos/síntomas articulares NE 490"></option>
									<option value="LOCOM Signos/síntomas de la espalda 494"></option>
									<option value="LOCOM Signos/síntomas del cuello 492"></option>
									<option value="LOCOM Signos/síntomas lumbares 495"></option>
									<option value="METAB Deshidratación 315"></option>
									<option value="METAB Hipoglucemia 344"></option>
									<option value="METAB Otros problemas endocrinos/metabólicos/nutricionales 474"></option>
									<option value="METAB Pérdida de peso 482"></option>
									<option value="NEURO Cefalea 306"></option>
									<option value="NEURO Convulsiones/crisis convulsivas 310"></option>
									<option value="NEURO Mareo y desvanecimiento 354"></option>
									<option value="NEURO Meningitis/encefalitis 357"></option>
									<option value="NEURO Movimientos involuntarios anormales 358"></option>
									<option value="NEURO Otros signos/síntomas neurológicos 475"></option>
									<option value="NEURO Vértigo/vahído 505"></option>
									<option value="OBITO Fallecimiento/muerte 336"></option>
									<option value="OFTAL Ojo rojo 460"></option>
									<option value="OFTAL Otras enfermedades/problemas de salud de ojos/anejos 463"></option>
									<option value="OTOL Cuerpo extraño en el oído 312"></option>
									<option value="OTOL Dolor de oído/oreja 322"></option>
									<option value="OTOL Otros signos/síntomas del oído/oreja 476"></option>
									<option value="OTOL Síndromes vertiginosos 498"></option>
									<option value="OTRO Derivado por otro 314"></option>
									<option value="OTRO Eval/Examen médico parcial/Pre-op. 335"></option>
									<option value="OTRO Medicación/prescripción/renovación/inyección355"></option>
									<option value="Precario médico"></option>
									<option value="PSICO Otros signos/síntomas psicológicos/mentales 477"></option>
									<option value="PSICO Síntomas y signos que involucran el estado emocional 500"></option>
									<option value="PSICO Síntomas y signos que involucran la apariencia y el comportamiento 499"></option>
									<option value="RESP Bronquitis/bronquiolitis aguda 305"></option>
									<option value="RESP Cuerpo extraño nariz/laringe/bronquios 313"></option>
									<option value="RESP Enfermedad pulmonar obstructiva crónica EPOC 330"></option>
									<option value="RESP Epistaxis/hemorragia nasal 331"></option>
									<option value="RESP Fatiga respiratoria/disnea 337"></option>
									<option value="RESP Gripe 340"></option>
									<option value="RESP Infección respiratoria aguda del tracto superior 348"></option>
									<option value="RESP Laringitis/traqueítis aguda 353"></option>
									<option value="RESP Neumonía 359"></option>
									<option value="RESP Otros signos/síntomas del aparato respiratorio 478"></option>
									<option value="RESP Respiración jadeante/sibilante 485"></option>
									<option value="TOXIC Complicación de tratamiento médico 309"></option>
									<option value="TOXIC Efectos tóxicos de sustancias no medicamentosas 328"></option>
									<option value="TOXIC Intoxicaciones/envenenamientos/sobredosificación por medicamentos 350"></option>
									<option value="TRAUM Efectos adversos factores físicos 327"></option>
									<option value="TRAUM Traumatismo/lesión NE 502"></option>
									<option value="TRAUM Traumatismos/lesiones múltiples 503"></option>
									<option value="UROL Cistitis/otras infecciones urinarias 308"></option>
									<option value="UROL Hematuria 342"></option>
									<option value="UROL Otros signos/síntomas del aparato urinario 480"></option>
									<option value="UROL Retención urinaria 486"></option>
								</datalist>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="destino_final">Destino Final {(this.state.inputValidation.destino_final.validationFailed || this.state.inputValidation.destino_final.validationFailed === null) ? <span>*</span> : <i className="fas fa-check"></i>}</label>
							<input className="w-100 form-control" list="final-destination" defaultValue={this.props.patientTreatmentData.mr.destino_final} onInput={(e) => this.anulaPaciente(e.target.value)} onBlur={(e) => this.captureDropdowns('destino_final', e.target.value)}/>
							<datalist id="final-destination">
								<option value="Anula paciente"></option>
								<option value="Anula por asistencia de otro sistema"></option>
								<option value="Anula por domicilio inexistente"></option>
								<option value="Anula por paciente ausente"></option>
								<option value="Anula por rechazo de asistencia"></option>
								<option value="Domicilio con instrucciones"></option>
								<option value="Domicilio rechaza traslado"></option>
								<option value="Evaluacion en amarillo"></option>
								<option value="Evaluacion en rojo"></option>
								<option value="Fallece pre arribo"></option>
								<option value="Paciente no contactado"></option>
								<option value="Traslado a hospital (por utim)"></option>
								<option value="Traslado en ambulancia comun"></option>
								<option value="Traslado en ambulancia con medico"></option>
								<option value="Traslado en ambulancia utim"></option>
							</datalist>
						</div>

						<div className="form-group">
							<label htmlFor="observations">Observaciones</label>
							<textarea name="finalDescription" className="form-control" ref='observations' id="observations" onChange={(e) => this.sendDataToPost('finalDescription', e.target.value)}></textarea>
						</div>
					</div>
				</div>
		  	</div>
		);
	}
}

export default PatientTreatment;
