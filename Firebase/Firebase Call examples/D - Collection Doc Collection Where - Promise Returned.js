
import DBConnection from '../../config/DBConnection';

const firestore = DBConnection.firestore();

export function getAppointmentByAid(aid) {
    let appointments = []
    let specialty = 'online_clinica_medica' // Temporal, luego habrá más especialidades
    const query = firestore.collection('assignations').doc(specialty).collection(currentDate).where('appointments.0', 'array-contains', aid)
    return new Promise((resolve, reject) => {
        query.get()
            .then((snap) => {
                snap.forEach((subDoc) => {
                    let data = subDoc.data()
                    appointments.push(data)      
                })
                return resolve(appointments[0])
            })
            .catch(err => reject(err))
      })
}
