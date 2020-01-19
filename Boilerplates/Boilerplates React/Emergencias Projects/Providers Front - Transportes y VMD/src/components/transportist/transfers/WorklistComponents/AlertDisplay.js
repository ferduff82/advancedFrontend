
import React from 'react';
import Alert from '../Utilities/Alert';

const AlertDisplay = (props) => {

    if (props.typeOfAlert === 'success') {
        return(
            <Alert alertType='success' titleMessage={props.alertMessage} />
        )
    } else if (props.typeOfAlert === 'danger') {
        return(
            <Alert alertType='danger' titleMessage={props.alertMessage} />
        )
    } else {
        return(
            ''
        )
    }
}

export default AlertDisplay;
