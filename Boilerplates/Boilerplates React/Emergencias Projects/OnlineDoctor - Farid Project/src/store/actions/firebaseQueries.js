import DBConnection from '../../config/DBConnection';
var d = new Date()
var currentMonth = ('0' + (d.getMonth() + 1)).substr(-2)
const currentDate = [d.getFullYear(), currentMonth].join('')
const firestore = DBConnection.firestore()

export const getAppointments = (apoint) => ({
    type: 'GET_APPOINTMENTS',
    payload: apoint
})

export const getPatient = (patient) => ({
    type: 'GET_PATIENT',
    payload: patient
})

export const getMed = (patient) => ({
    type: 'GET_MEDICAL_RECORD',
    payload: patient
})

export const getOneRecord = (patient) => ({
    type: 'GET_ONE_RECORD',
    payload: patient
})

export function searchActiveProviders(rol = "ONLINE") {
    let docQuery = firestore.collection('providers').where("rol", "==", rol)
    return new Promise((resolve, reject) => {
        docQuery.get()
            .then((snap) => {
                let data = []
                snap.forEach((d) => {
                    data.push(d.data())
                })
                return resolve(data)
            })
            .catch(err => reject(err))
      })
}


export function listenAppointments(specialty) {
    try {
        var appointments = []
        specialty = 'online_clinica_medica' // Temporal, luego habrá más especialidades
        const appointmentsQuery = firestore.collection('assignations').doc(specialty).collection(currentDate).where('state', '==', 'ASSIGN')
        return dispatch => {
            appointmentsQuery.onSnapshot({
                includeMetadataChanges: true
            }, function (snapshot) {
                snapshot.forEach((subDoc) => {
                    let data = subDoc.data()
                    appointments.push(data)      
                })
                dispatch(getAppointments(appointments))
            })
        }
    } catch (err) {
        return {type: 'ERROR', payload: 'listenAppointments' + err}
    }
}

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

export function getDoctor(cuit) {
    const docQuery = firestore.collection('providers').doc(cuit)
    return new Promise((resolve, reject) => {
        docQuery.get()
            .then((doc) => {
                return resolve(doc.data())
            })
            .catch(err => reject(err))
      })
}

export function getAuth(ws) {
    return new Promise((resolve, reject) => {
        const authQuery = firestore.collection('auth').doc(ws)
        authQuery.get()
            .then((doc) => {
                return resolve(doc.data())
            })
            .catch(err => reject(err))
      })
}

export function getPatientByEmail(email) {
    return new Promise((resolve, reject) => {
        const authQuery = firestore.collection('auth').where('email', '==', email)
        authQuery.get()
            .then((doc) => {
                let user = []
                doc.forEach((each) => user.push(each.data()))
                return resolve(user[0])
            })
            .catch(err => reject(err))
      })
}

export function getPatientData(ws) {
    try {
    const usersQuery = firestore.collection('auth').doc(ws).get()
    return dispatch => {
            dispatch({type: 'LOADING', payload: true})
            usersQuery
                .then(function(doc) {
                    if(doc.exists) {
                        let data = doc.data()
                        dispatch(getPatient(data))
                        dispatch({type: 'LOADING', payload: false})
                        return "exist"
                    } 
                    else {
                        dispatch({type: 'ERROR', payload: "No se encontraron usuarios"})
                        dispatch({type: 'LOADING', payload: false})
                        return "doesn't exist"
                    } 
                })
                .catch(err => {
                    console.log(err)
                    dispatch({type: 'ERROR', payload: 'getPatientData for ' + ws + err})
                    dispatch({type: 'LOADING', payload: false})
                })
    }
    } catch (err) {
        return {type: 'ERROR', payload: ' getPatientData for ' + ws + err}
    }
}

export function getMedicalRecord(user) {
    try {
    const usersQuery = firestore.collection('events').doc('mr').collection(user).orderBy('created_dt', 'desc')
    return dispatch => {
        usersQuery.onSnapshot((subSnapshot) => {
        var tempArray = [];
        subSnapshot.forEach((content) => {
            tempArray.push(content.data());
        })
        dispatch(getMed(tempArray))
    })
    }
    } catch (err) {
        return {type: 'ERROR getMedicalRecord', err}
    }
}


export function getVoucher(user) {
    try {
    const usersQuery = firestore.collection('events').doc('mr').collection(user).orderBy('created_dt', 'desc').limit(1)
    return dispatch => {
        usersQuery.onSnapshot((subSnapshot) => {
        var tempArray = [];
        subSnapshot.forEach((content) => {
            let data = content.data()
            if(data.mr.dt_cierre !== "") {
                tempArray.push(content.data());
            }
        })
        dispatch(getOneRecord(tempArray))
    })
    }
    } catch (err) {
        return {type: 'ERROR getVoucher', err}
    }
}

export function getVoucherById(user, aid) {
    try {
    const usersQuery = firestore.collection('events').doc('mr').collection(user).doc(aid)
    return dispatch => {
        usersQuery.onSnapshot((doc) => {
            let data = doc.data()
        dispatch(getOneRecord(data))
    })
    }
    } catch (err) {
        return {type: 'ERROR', err}
    }
}

