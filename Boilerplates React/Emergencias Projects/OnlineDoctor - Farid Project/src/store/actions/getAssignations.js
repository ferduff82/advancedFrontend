import DBConnection from '../../config/DBConnection';
var d = new Date()
var currentMonth = ('0' + (d.getMonth() + 1)).substr(-2)
currentMonth = [d.getFullYear(), currentMonth].join('')

export const getAssignations = (assigns) => ({
    type: 'GET_ASSIGNS',
    payload: assigns
})

export const getAppointment = (appoint) => ({
    type: 'GET_APPOINT',
    payload: appoint
})

export const saveAppointment = (assigns) => ({
    type: 'SAVE_ASSIGN',
    payload: assigns
})

export function listenAssigns(specialty) {
    const firestore = DBConnection.firestore()
    var query = firestore.collection('assignations').doc(specialty).collection(currentMonth)
    var assignements = {}
    return dispatch => {
        query.onSnapshot({
            includeMetadataChanges: true
        }, function (snapshot) {
            const assigns = []
            snapshot.forEach((subDoc) => {
                // let now = new Date()
                //  -> EL IF CON && subDoc.data().date > now
                let data = subDoc.data()
                let date = new Date(data.date + ' ' + data.time)
                let now = new Date().getTime()
                if (subDoc.data() && date.getTime() > now) {
                    assignements = {
                        'title': data.cm,
                        'start': date,
                        'end': date,
                        'fullname': data.fullname,
                        'address': data.cm,
                        'img': data.path_profile_pic ? data.path_profile_pic : '',
                        'specialty': data.especialidad,
                        'geo': {
                            'lat': data.geo.lat,
                            'long': data.geo.lon
                            },
                        'key': subDoc.ref.id,
                        'path': subDoc.ref.path,
                        'datestring': data.date
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

export function listenAppointment(specialty, key, cm) {
    const firestore = DBConnection.firestore()
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

export function matchToStore(match) {
    return dispatch => dispatch({
        type: 'MATCH_TO_STORE',
        payload: match
    })
}

export function selectedAppointment(appoint) {
    return dispatch => dispatch({
        type: 'CONFIRMED_APPOINTMENT',
        payload: appoint
    })
}