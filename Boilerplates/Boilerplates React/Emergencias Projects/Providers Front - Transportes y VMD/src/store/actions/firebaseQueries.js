import DBConnection from '../../config/DBConnection';

// EXAMPLE
/* export function getRecordById(user, aid) {
    const query = firestore.collection('events').doc('mr').collection(user).doc(aid)
    return new Promise((resolve, reject) => {
        query.get()
            .then((snap) => {
                let data = snap.data()
                return resolve(data)
            })
            .catch(err => reject(err))
      })
} */