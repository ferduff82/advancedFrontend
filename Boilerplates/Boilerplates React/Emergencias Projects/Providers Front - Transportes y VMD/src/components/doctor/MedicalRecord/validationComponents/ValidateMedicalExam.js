
import values_motivo from './validateDatalists/MedicalExamMotivoDeConsulta';

function inputValidation(type, value, disabled) {

	if (type === 'motivo_de_consulta') {
		let isValueEmpty = value ? false : true,
			valueExist = values_motivo.filter(function(eachValue) {
				return eachValue.toLowerCase() === value.toLowerCase();
			})
		if (isValueEmpty) {
			return { validationFailed: true, validationData: 'El valor no puede estar vacío' }
		} else if (valueExist.length === 0) {
			return { validationFailed: true, validationData: 'El valor no coincide con los valores listados' }
		} else {
			return { validationFailed: false }
		}
	} else if (type === 'epicrisis') {
		let isValueEmpty = value ? false : true;
		if (isValueEmpty) {
			return { validationFailed: true, validationData: 'El valor no puede estar vacío' }
		} else {
			return { validationFailed: false }
		}
	} else if (type === 'presion_sistolica' || type === 'heart_rate') {
		let isValueEmpty = value ? false : true;
		if (isValueEmpty && !disabled) {
			return { validationFailed: true, validationData: 'El valor no puede estar vacío' }
		} else if (value > 400) {
			return { validationFailed: true, validationData: 'El valor no puede ser mayor a 400' }
		} else {
			return { validationFailed: false }
		}
	} else if (type === 'presion_diastolica') {
		let isValueEmpty = value ? false : true;
		if (isValueEmpty && !disabled) {
			return { validationFailed: true, validationData: 'El valor no puede estar vacío' }
		} else if (value > 200) {
			return { validationFailed: true, validationData: 'El valor no puede ser mayor a 200' }
		} else {
			return { validationFailed: false }
		}
	} else {
		return { validationFailed: false }
	}

	return;
}

export default inputValidation;
