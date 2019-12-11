
export default function validateProfessional(props) {
    if (props.isMedicalVisitValid || 
        props.isConsultoryValid || 
        props.isOnLineValid) {
        return false;
    } else {
        return true;
    }
}
