
import DBConnection from '../../config/DBConnection';

export function listenAppointment(specialty, key, cm) {
    const firestore = DBConnection.firestore();
    const query = firestore.collection('assignations').doc(specialty).collection(currentMonth).doc(key)
    var appointment = {}
    return dispatch => {
        query.onSnapshot({
            includeMetadataChanges: true
        }, function(snapshot){
            appointment = { ...snapshot.data(),
            'path': snapshot.ref.path,
            'dateref': snapshot.date
         }
          dispatch(getAppointment(appointment))  
        })
    }
}
