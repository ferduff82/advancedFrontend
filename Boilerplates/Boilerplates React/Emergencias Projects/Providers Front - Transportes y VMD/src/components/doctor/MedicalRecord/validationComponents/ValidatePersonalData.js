
function inputValidation(type, value) {

	if (type === 'dni') {
		let isValueEmpty = value ? false : true,
			isValidId = value.match(/^[0-9]{8,8}$/),
			isNumber = value.match(/^[0-9]+$/);
		if (isValueEmpty) {
			return { validationFailed: true, validationData: 'El valor no puede estar vacío' }
		} else if (!isNumber) {
			return { validationFailed: true, validationData: 'El valor debe ser un número' }
		} else if (!isValidId) {
			return { validationFailed: true, validationData: 'Este no es un DNI válido' }
		} else {
			return { validationFailed: false }
		}
	} else if (type === 'dob') {
		let myDate = new Date(value),
        	today = new Date();
		if ( myDate > today ) { 
			return { validationFailed: true, validationData: 'La fecha no puede ser superior a la de hoy' }
		} else {
			return { validationFailed: false }
		}
	}
	return;
}

export default inputValidation;
