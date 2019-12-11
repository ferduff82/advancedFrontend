
import DBConnection from '../../config/DBConnection';

export const getAssignations = (assigns) => ({
    type: 'GET_ASSIGNS',
    payload: assigns
})

export const getAppointment = (appoint) => ({
    type: 'GET_APPOINT',
    payload: appoint
})

export function listenAssigns() {
    const firestore = DBConnection.firestore()
    const query = firestore.collection('assignations').doc('hematologia').collection('201904')
    var assignements = {}
    return dispatch => {
        query.onSnapshot({
            includeMetadataChanges: true
        }, function (snapshot) {
            const assigns = []
            snapshot.forEach((subDoc) => {
                if (subDoc.data()) {
                    let data = subDoc.data()
                    let date = new Date(data.date + ' ' + data.time)
                    assignements = {
                        'title': data.cm,
                        'start': date,
                        'end': date,
                        'fullname': data.fullname,
                        'address': data.cm,
                        'img': data.path_profile_pic,
                        'geo': {
                            'lat': data.geo.lat,
                            'long': data.geo.lon
                            },
                        'key': subDoc.ref.id,
                        'path': subDoc.ref.path
                    }
                    assigns.push(assignements)
                }
            })
            async function dispatching() {
                await dispatch(getAssignations(assigns))
            }
            dispatching()
        }
        )
    }
}

export function listenAppointment() {
    const firestore = DBConnection.firestore()
    const query = firestore.collection('assignations').doc('hematologia').collection('201904').doc('201904220800_IMPORT105')
    var appointment = {}
    return dispatch => {
        query.onSnapshot({
            includeMetadataChanges: true
        }, function(snapshot){
            const appoint = []
            appointment = snapshot.data()
            /* snapshot.forEach((subDoc) => {
                if(subDoc.data()){
                    appointment = {
                        'cm': subDoc.data().cm
                    }
                }
                appoint.push(appointment)
            }) */
          dispatch(getAppointment(appointment))  
        })
    }
}

export function appointmentsByPlace() {
    const firestore = DBConnection.firestore()
    const query = firestore.collection('assignations').doc('hematologia').collection('201904')
    var appointment = {}
    return dispatch => {
        query.onSnapshot({
            includeMetadataChanges: true
        }, function(snapshot){
            let appoint = []
            snapshot.forEach((subDoc) => {
                
            })
          dispatch(getAppointment(appointment))  
        })
    }
}
