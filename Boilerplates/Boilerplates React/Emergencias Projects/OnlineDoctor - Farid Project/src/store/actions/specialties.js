import DBConnection from '../../config/DBConnection';
export const Specialties = (sp) => ({
    type: 'GET_SPECIALTIES',
    payload: sp
})


export function getSpecialties() {
    const firestore = DBConnection.firestore()
    const query = firestore.collection('assignations')
    var sp = {}
    return dispatch => {
        query.get().then(function(doc) {
            if(doc) {
                console.log(doc)
            }
        })
    }
}