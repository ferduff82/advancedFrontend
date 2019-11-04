
import DBConnection from '../../config/DBConnection';

const firestore = DBConnection.firestore();

export function getAttDossier(att) {
    const query = firestore.collection('events').doc('mr').collection(att).orderBy("created_dt", "desc").limit(1).get()
    return dispatch => {
        query.then((snapshot) => {
            snapshot.forEach((each) => {
                dispatch(getMed(each.data()))
            })
    })
    }
}
