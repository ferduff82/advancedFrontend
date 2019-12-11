
import React, { Component } from 'react';
import ValidateInput from '../components/validationComponents/ValidatePersonalData';
import '../styles/PatientPersonalData.scss';
import Switch from 'react-switch';


class PatientPersonalData extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false,
			enableEditing: false,
			isAllValid: false,
			inputValidation : {
				dni: {
					validationFailed: null,
					validationData: false
				},
				dob: {
					validationFailed: null,
					validationData: false
				}
			}
		};
	}

	/* General Functions */

	showThisDropdown() {
		this.props.setArrowOpen('patientDisplay');
	};

	enableUserEditing() {
		const currentCheckState = this.state.enableEditing,
			  notCurrentCheck = !currentCheckState;
		this.setState({ enableEditing: notCurrentCheck });
		(notCurrentCheck && this.state.inputValidation.dni.validationFailed === true) ? this.props.isPatientCompleted(false) : this.props.isPatientCompleted(true);
		if (currentCheckState) {
			this.props.cleanPersonalData();
			this.resetDataToPost();
		}
	}

	resetDataToPost() {
		this.props.patientData.user.firstname ? this.sendDataToPost('firstname', this.props.patientData.user.firstname) : this.refs.firstname.value = '';
		this.props.patientData.user.lastname ? this.sendDataToPost('lastname', this.props.patientData.user.lastname) : this.refs.lastname.value = '';
		this.props.patientData.user.dob ? this.sendDataToPost('dob', this.props.patientData.user.dob) : this.refs.dob.value = '';
		this.props.patientData.user.dni ? this.sendDataToPost('dni', this.props.patientData.user.dni) : this.refs.dni.value = '';
		this.props.patientData.user.sex ? this.sendDataToPost('sex', this.props.patientData.user.sex) : this.refs.sex.value = '';
		this.props.patientData.user.antecedentes ? this.sendDataToPost('antecedentes', this.props.patientData.user.antecedentes) : this.refs.antecedentes.value = '';
	}

	validateAndPush(type, value) {
		this.validateInput(type, value);
		this.sendDataToPost(type, value)
	}

	validateInput(type, value) {
		let validate = ValidateInput(type, value);
		this.setState(function(state) { 
			return state.inputValidation[type] = validate
		}, () => { 
			this.isFormCompleted(type) 
		})
	}

	isFormCompleted(type) {
		let anyFalse = this.state.inputValidation[type].validationFailed;
		!anyFalse ? this.props.isPatientCompleted(true) : this.props.isPatientCompleted(false);
		this.setState({
			isAllValid: anyFalse
		}) 
	}

	sendDataToPost(inputKey, value) {
		this.props.sendPostState('patientPersonalData' ,inputKey , value);
	}

	/* Native React Functions */

	componentDidMount() {
		this.resetDataToPost();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.arrowOpen === 'patientDisplay') {
			this.setState({open: false});
		} else {
			this.setState({open: true});
		}
	}

	render() {
		return (
		  	<div className="patientPersonalData" >
		  		<div>
				  	<div className={this.state.isAllValid && this.state.enableEditing
						? "notCompleted mb-3 mt-4 mb-4 mr-3 ml-3 text-left aditional-height d-flex"
						: "mb-4 mt-4 mr-3 ml-3 text-left aditional-height d-flex"
					} 
					onClick={() => this.showThisDropdown()}>
				  		<div className="color-left"></div>
						<div className="mt-2">
							<h6 className="position-absolute">Datos personales del paciente</h6>
							<div className="w-100">{this.state.open ? <i className="fas fa-plus-circle circle-icon position-absolute"></i> : <i className="fas fa-minus-circle circle-icon position-absolute"></i>}</div>
						</div>
					</div>
				</div>
				<div className={this.state.open ? 'd-none pt-2 pr-3 pb-3 pl-3 mr-2 ml-2 rounded backForm' : 'pt-2 pr-3 pb-3 pl-3 mr-2 ml-2 rounded backForm'} >
					<div>
						<div className="userEditContainer custom-control custom-checkbox">
							<Switch type="checkbox" checked={this.state.enableEditing} id="defaultIndeterminate2" className="custom-control-input userEditCheck" onChange={() => this.enableUserEditing()}/>
							<label className="userEditLabel custom-control-label" htmlFor="defaultIndeterminate2">Editar la información del Usuario</label>
						</div>
						<div className="form-group">
							<label htmlFor="firstname">Nombre</label>
							<input type="text" ref="firstname" className="form-control" id="firstname" onChange={(e) => this.sendDataToPost('firstname', e.target.value)} defaultValue={this.props.patientData.user.firstname} disabled={this.state.enableEditing ? false : true}></input>
						</div>
						<div className="form-group">
							<label htmlFor="lastname">Apellido</label>
							<input type="text" ref="lastname" className="form-control" id="lastname" onChange={(e) => this.sendDataToPost('lastname', e.target.value)} defaultValue={this.props.patientData.user.lastname} disabled={this.state.enableEditing ? false : true}></input>
						</div>
						<div className="form-group">
							{this.state.inputValidation.dob.validationFailed ? <div className="inputError">{this.state.inputValidation.dob.validationData}</div> : ''}
							<label htmlFor="dob">Fecha de nacimiento</label>
							<input type="date" ref="dob" className="form-control" id="dob" onChange={(e) => this.validateAndPush('dob', e.target.value)} defaultValue={this.props.patientData.user.dob} disabled={this.state.enableEditing ? false : true}></input>
						</div>
						<div className="form-group">
							{this.state.inputValidation.dni.validationFailed ? <div className="inputError">{this.state.inputValidation.dni.validationData}</div> : ''}
							<label htmlFor="dni">DNI</label>
							<input type="text" ref="dni" className="form-control" id="dni" onChange={(e) => this.sendDataToPost('dni', parseInt(e.target.value))} defaultValue={this.props.patientData.user.dni} onBlur={(e) => this.validateInput('dni', e.target.value)} disabled={this.state.enableEditing ? false : true}></input>
						</div>
						<div className="form-group">
							<label htmlFor="sex">Sexo</label>
							<select className="w-100 form-control" ref="sex" id="sex" onChange={(e) => this.sendDataToPost('sex', e.target.value)} defaultValue={this.props.patientData.user.sex} disabled={this.state.enableEditing ? false : true}>
								<option value="F">Mujer</option>
								<option value="M">Hombre</option>
								<option value="D">Desconocido</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="patientBackground">Antecedentes (alergias, etc.)</label>
							<textarea name="patientBackground" className="form-control" id="patientBackground" onChange={(e) => this.sendDataToPost('patientBackground', e.target.value)} disabled={this.state.enableEditing ? false : true}></textarea>
						</div>
						<div className="form-group">
							<label htmlFor="background">Seleccionar Antecedente</label>
							<input className="w-100 form-control" ref="antecedentes" list="antecedentes" onChange={(e) => this.sendDataToPost('antecedentes', e.target.value)} disabled={this.state.enableEditing ? false : true}/>
							<datalist id="antecedentes">
								<option value="ACV">ACV</option>
								<option value="Adicciones">Adicciones</option>
								<option value="Alcoholismo">Alcoholismo</option>
								<option value="Alergia medicamentosa">Alergia medicamentosa</option>
								<option value="Alergia no medicamentosa">Alergia no medicamentosa</option>
								<option value="ALTE (Pediatria)">ALTE (Pediatria)</option>
								<option value="Alteraciones del estado de ánimo">Alteraciones del estado de ánimo</option>
								<option value="Anemia">Anemia</option>
								<option value="Anticoagulación">Anticoagulación</option>
								<option value="Arritmia">Arritmia</option>
								<option value="Artritis">Artritis</option>
								<option value="Artrosis">Artrosis</option>
								<option value="Asma">Asma</option>
								<option value="Atopía (Pediatria)">Atopía (Pediatria)</option>
								<option value="Bronquiolitis (Pediatria)">Bronquiolitis (Pediatria)</option>
								<option value="Cardiopatía adquirida">Cardiopatía adquirida</option>
								<option value="Cardiopatía congénita">Cardiopatía congénita</option>
								<option value="Colon irritable">Colon irritable</option>
								<option value="Convulsión febril benigna (Pediatria)">Convulsión febril benigna (Pediatria)</option>
								<option value="Convulsiones">Convulsiones</option>
								<option value="Demencia">Demencia</option>
								<option value="Desconoce">Desconoce</option>
								<option value="Desnutrición">Desnutrición</option>
								<option value="Diabetes insulino requiriente">Diabetes insulino requiriente</option>
								<option value="Diabetes no insulino requiriente">Diabetes no insulino requiriente</option>
								<option value="Dialisis">Dialisis</option>
								<option value="Diarrea crónica">Diarrea crónica</option>
								<option value="Dislipemia">Dislipemia</option>
								<option value="Enfermedad crónica de piel">Enfermedad crónica de piel</option>
								<option value="Enfermedad diverticular">Enfermedad diverticular</option>
								<option value="Enfermedad hematológica">Enfermedad hematológica</option>
								<option value="Enfermedad inmunológica">Enfermedad inmunológica</option>
								<option value="Enfermedad reumática">Enfermedad reumática</option>
								<option value="Enfermedad ulceropéptica">Enfermedad ulceropéptica</option>
								<option value="EPOC">EPOC</option>
								<option value="Fibrosis pulmonar">Fibrosis pulmonar</option>
								<option value="Fumador">Fumador</option>
								<option value="Hepatitis">Hepatitis</option>
								<option value="Hepatopatía">Hepatopatía</option>
								<option value="Hipotiroidismo">Hipotiroidismo</option>
								<option value="HIV">HIV</option>
								<option value="HTA">HTA</option>
								<option value="Infarto / Coronariopatía">Infarto / Coronariopatía</option>
								<option value="Infección urinaria">Infección urinaria</option>
								<option value="Insuficiencia Cardíaca">Insuficiencia Cardíaca</option>
								<option value="Insuficiencia renal">Insuficiencia renal</option>
								<option value="Litiasis biliar">Litiasis biliar</option>
								<option value="Litiasis renal">Litiasis renal</option>
								<option value="Lumbalgia crónica">Lumbalgia crónica</option>
								<option value="Malabsorcion">Malabsorcion</option>
								<option value="Marcapasos">Marcapasos</option>
								<option value="Neoplasia">Neoplasia</option>
								<option value="Neumonia">Neumonia</option>
								<option value="Niega">Niega</option>
								<option value="Obesidad">Obesidad</option>
								<option value="Obstrucción Bronquial recurrente (Pediatria)">Obstrucción Bronquial recurrente (Pediatria)</option>
								<option value="Pancreatitis">Pancreatitis</option>
								<option value="Parasitosis">Parasitosis</option>
								<option value="Postración">Postración</option>
								<option value="Problemas de conducta">Problemas de conducta</option>
								<option value="Reflujo gastroesofágico (Pediatría)">Reflujo gastroesofágico (Pediatría)</option>
								<option value="Reflujo vésico-ureteral (Pediatría)">Reflujo vésico-ureteral (Pediatría)</option>
								<option value="Síncope">Síncope</option>
								<option value="Síndrome urémico hemolítico (Pediatría)">Síndrome urémico hemolítico (Pediatría)</option>
								<option value="Transplante renal">Transplante renal</option>
								<option value="Trastornos de la coagulación">Trastornos de la coagulación</option>
								<option value="Tuberculosis">Tuberculosis</option>
								<option value="Vomitador (Pediatría)">Vomitador (Pediatría)</option>
							</datalist>
						</div>
					</div>
				</div>
		  	</div>
		);
	}
}

export default PatientPersonalData;
