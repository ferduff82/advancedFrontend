
import Values_Diagnostic from './validateDatalists/PatientTreatmentDiagnostic';
import Values_Destination from './validateDatalists/PatientTreatmentFinalDestination';

function inputValidation(type, value) {

	if (type === 'tratamiento' || type === 'observaciones') {
		let isValueEmpty = value ? false : true;
		if (isValueEmpty) {
			return { validationFailed: true, validationData: 'El valor está vacío' }
		} else {
			return { validationFailed: false }
		}
	} else if (type === 'diagnostico') { 
		var isValueEmpty = value ? false : true,
			valueExist = '';

		if (typeof value === "string") {
			valueExist = Values_Diagnostic.filter(function(eachValue) {
				return eachValue.toLowerCase() === value.toLowerCase();
			})
		}
		if (isValueEmpty) {
			return { validationFailed: true, validationData: 'El valor no puede estar vacío' }
		} else if (valueExist.length === 0) {
			return { validationFailed: true, validationData: 'El valor no coincide con los valores listados' }
		} else {
			return { validationFailed: false }
		}
	} else if (type === 'destino_final') { 
		let isValueEmpty = value ? false : true,
			valueExist = Values_Destination.filter(function(eachValue) {
				return eachValue.toLowerCase() === value.toLowerCase();
			})
		if (isValueEmpty) {
			return { validationFailed: true, validationData: 'El valor no puede estar vacío' }
		} else if (valueExist.length === 0) {
			return { validationFailed: true, validationData: 'El valor no coincide con los valores listados' }
		} else {
			return { validationFailed: false }
		}
	} else if (type === 'gduh') {
		if (value === '' || value === false) {
			return { validationFailed: true, validationData: 'El valor está vacío' }
		} else {
			return { validationFailed: false }
		}
	} else  {
		if (value === '' || value === false) {
			return { validationFailed: true, validationData: 'El valor está vacío' }
		} else {
			return { validationFailed: false }
		}
	}
	return;
}

export default inputValidation;
