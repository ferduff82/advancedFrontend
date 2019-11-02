import DBConnection from '../../components/DBConnection';
import {GET_AUTH} from '../../constants/ActionTypes';

import { idRegex, serviceRegex, monitorRegex, outcomeRegex } from '../../constants/regEx'

const firestore = DBConnection.firestore(),
    query = firestore.collection('auth').orderBy("dt_start", "desc")

export const getAuth = (users) => ({type: GET_AUTH, payload: users})

export function getAuthThunk() {
    return dispatch => {
    let unsubscribe = query.onSnapshot(function(snapshot) {
            const users = []
            snapshot.forEach((subDoc) => {
                if(subDoc.data().context !== ""){
                let data = subDoc.data()
                users.push(data)
                }    
            })
            dispatch(getAuth(users))
            dispatch(filterAuth(users))
        })
    }
}

export function filterAuth(users) {
    return (dispatch) => {
        dispatch({
            type: 'FILTER_ID',
            payload: users.filter((getIdUsers) => {
                return idRegex.test(getIdUsers.context)})
        })
        dispatch({
            type: 'FILTER_SERVICE',
            payload: users.filter((getServiceUsers) => {
                return serviceRegex.test(getServiceUsers.context)})
        })
        dispatch({
            type: 'FILTER_MONITOR',
            payload: users.filter((getMonitorUsers) => {
                return monitorRegex.test(getMonitorUsers.context)})
        })
        dispatch({
            type: 'FILTER_OUTCOME',
            payload: users.filter((getOutcomeUsers) => {
                return outcomeRegex.test(getOutcomeUsers.context)})
        })
    }
  }