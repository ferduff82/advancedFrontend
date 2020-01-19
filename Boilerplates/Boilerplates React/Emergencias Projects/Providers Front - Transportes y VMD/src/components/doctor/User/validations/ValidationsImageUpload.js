
import { store } from '../../../../store/configStore';

export default function validateDocumentation(props) {

    const tempStore = store.getState();
    const getRol = tempStore.validate.isValidValue.data;
    /*
    const unsuscribe = store.subscribe(() => {
        tempStore = store.getState();
    });
    */
    console.log(tempStore.validate.isValidValue.data);

    if (getRol === 'MEDICO') {
        /* Validar en caso que el Rol seleccionado sea médico */
        if (!props.cvData ||
            !props.tituloData ||
            !props.seguroData ||
            !props.afipData ||
            !props.matriculaData ||
            !props.expireSeguro ||
            !props.expireMatricula) {
            //unsuscribe();
            return true;
        } else {
            //unsuscribe();
            return false;
        }
    } else if (getRol === 'ENFERMERO') {
        /* Validar en caso que el Rol seleccionado sea enfermero */
        if (!props.cvData ||
            !props.tituloData ||
            !props.matriculaData ||
            !props.expireMatricula) {
            return true;
        } else {
            return false;
        }
    } else if (getRol === 'KINESIOLOGO' || 'NUTRICIONISTA' || 'PSICOLOGO') {
        /* Validar en caso que el Rol seleccionado sea Kinesiologo, Nutricionista, Psicólogo */
        if (!props.cvData ||
            !props.matriculaData ||
            !props.expireMatricula) {
            return true;
        } else {
            return false;
        }
    }
}
