
import DBConnection from '../../config/DBConnection';
import { store } from '../../store/configStore';

 var getAssignationsData = (dateSelection, getCuitData, socialWork) => {
    const firestore = DBConnection.firestore();
    let query = firestore.collection('assignations').doc(dateSelection).collection(socialWork).limit(50);
    var unsuscribe = query.onSnapshot({
        includeMetadataChanges: true
    }, function (snapshot) {
        let assigns = []
        snapshot.forEach((subDoc) => {
            assigns.push(subDoc.data())
        })
        assigns = assigns.sort((a,b) => (a.created_dt > b.created_dt) ? 1 : ((b.created_dt > a.created_dt) ? -1 : 0));
        console.log(assigns);
        store.dispatch({type: 'TRIGGER_ASSIGNATIONS', payload: assigns})
    })
    return unsuscribe;
}

export default getAssignationsData;
