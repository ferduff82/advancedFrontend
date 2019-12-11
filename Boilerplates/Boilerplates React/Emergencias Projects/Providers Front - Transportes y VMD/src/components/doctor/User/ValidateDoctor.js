
import React from 'react';
import FaceRecognition from './DoctorRecognition/FaceRecognition';
import Modal from './Utils/Modal'

const ValidateDoctor = () => {
    return (
        <Modal hideCloseButton={true} title="Registrar rostro">
            <FaceRecognition />
        </Modal>
    )

}

export default ValidateDoctor;
