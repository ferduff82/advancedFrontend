
import ValidateDocumentation from './ValidationsImageUpload';
import ValidateProfessional from './ValidateProfessional';

export default function validateSubmit(props) {
    if (!props.isDaytimeValid || 
        !props.checkData || 
        !props.isServiceValid || 
        props.advancedValidation || 
        ValidateDocumentation(props) || 
        ValidateProfessional(props)) {
        return true;
    } else {
        return false;
    }
}
