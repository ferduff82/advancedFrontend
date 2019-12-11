
import React, { Component } from 'react';

class PatientPersonalDataAborted extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	toggleClass() {
		const currentState = this.state.open;
		this.setState({ open: !currentState });
	};

	render() {
		return (
		  	<div>
		  		<div>
					<div className="pt-3 pr-3 pl-3 text-left">
						<h6 className="position-absolute">Datos personales del paciente</h6>
						<div onClick={() => this.toggleClass()}><i className="material-icons text-right w-100">{this.state.open ? 'expand_more' : "expand_less"}</i></div>
					</div>
				</div>
		  		<div className={this.state.open ? 'd-none pt-3 mr-3 ml-3 rounded backForm' : 'p-3 mr-3 ml-3 rounded backForm'} >
					<div>
						<form>
							<div className="form-group">
								<label htmlFor="firstName">Nombre</label>
								<input type="text" className="form-control" id="firstName" disabled></input>
							</div>
							<div className="form-group">
								<label htmlFor="lastName">Apellido</label>
								<input type="text" className="form-control" id="lastName" disabled></input>
							</div>
							<div className="form-group">
								<label htmlFor="dateOfBirth">Fecha de nacimiento</label>
								<input type="date" className="form-control" id="dateOfBirth" disabled></input>
							</div>
							<div className="form-group">
								<label htmlFor="id">DNI</label>
								<input type="text" className="form-control" id="id" disabled></input>
							</div>
							<div className="form-group">
								<label htmlFor="sex">Género</label>
								<input type="text" className="form-control" id="sex" disabled></input>
							</div>
							<div className="form-group">
								<label htmlFor="alergies">Antecedentes (alergias, etc.)</label>
								<textarea name="alergies" className="form-control" id="alergies" disabled></textarea>
							</div>
							<div className="form-group">
								<select className="w-100 form-control">
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
								</select>
							</div>
						</form>
					</div>
				</div>
		  	</div>
		);
	}
}

export default PatientPersonalDataAborted;
