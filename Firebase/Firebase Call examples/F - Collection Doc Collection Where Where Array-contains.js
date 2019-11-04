
import DBConnection from '../../config/DBConnection';

const firestore = DBConnection.firestore();

export function getNextAppointment(user, specialty) {
    try {
        var appointments = []
        specialty = 'online_clinica_medica' // Temporal, luego habrá más especialidades
        const appointmentsQuery = firestore.collection('assignations').doc(specialty).collection(currentDate).where("state", "==", "ASSIGN").where('appointments.0', 'array-contains', user)
        return dispatch => {
            appointmentsQuery.onSnapshot({
                includeMetadataChanges: true
            }, function (snapshot) {
                snapshot.forEach((subDoc) => {
                    let data = subDoc.data()
                    appointments.push(data)      
                })
                dispatch({type: 'SET_NEXT_APPOINTMENT', payload: appointments[0]})
            })
        }
    } catch (err) {
        return {type: 'ERROR', payload: 'listenAppointments' + err}
    }
}