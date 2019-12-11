export const validateTel = (tel) => {
    if (tel) {
        const valLength = (tel.length === 13)
        const valFirstNumbers = (tel.slice(0, 3) === "549")

        return (valLength && valFirstNumbers) ? {
            state: true
        } : {
                state: false, msg: "Hay un problema con la longitud de su número o falta el código de área."
            }
    } else {
        return {
            state: false,
            msg: "Tiene que introducir el número."
        }
    }
}

export const validatePass = (pass) => {
    if (pass) {
        const valLength = (pass.length >= 6)
        return valLength ? { state: true } : { state: false, msg: "La contraseña debe tener al menos 6 dígitos." }
    } else {
        return {
            state: false,
            msg: "Debe introducir una contraseña"
        }
    }
}

export const validateCuil = (cuil) => {
    if (cuil) {
        const valLength = (cuil.length === 13 || cuil.length === 12 || cuil.length === 11)
        const numReg = new RegExp('^[0-9]+$');
        return (valLength && numReg.test(cuil)) ? { state: true } : { state: false, msg: "El cuil debe estar completo y solo contener números" }
    } else {
        return {
            state: false,
            msg: "Debe introducir una contraseña"
        }
    }
}