import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyRecords from '../components/MyRecords/MyRecods';
import Record from '../components/MyRecords/Record'
import { getMedicalRecord } from '../store/actions/firebaseQueries';

const History = (props) => {
    const dispatch = useDispatch();
    const patient = useSelector(state => state.queries.patient)

    useEffect(() => {
        let local = JSON.parse(localStorage.getItem('userData'))
        let p = patient.dni || local.dni
        dispatch(getMedicalRecord(p))
    }, [patient.dni, dispatch])

    if(props.match.params.record) {
        return <Record aid={props.match.params.record} />
    } else {
        return <MyRecords />
    }
}

export default History;