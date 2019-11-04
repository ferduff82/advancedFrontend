import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getPatientByEmail, getMedicalRecord} from '../../store/actions/firebaseQueries';
import GetWs from '../../views/GetWs';
import app from "../../config/DBConnection";
import ModulesMenu from './ModulesMenu';
import Loading from '../GeneralComponents/Loading';
import NotFound from '../GeneralComponents/NotFound';

const Index = (props) => {
    const dispatch = useDispatch()
    const checkStatus = useSelector(state => state.front.checkStatus)
    const user = useSelector(state => state.queries.patient)
    const mr = useSelector(state => state.queries.medicalRecord)

    useEffect(() => {
        let email = app.auth().currentUser.email
        getPatientByEmail(email)
            .then(patient => {
                dispatch({ type: 'GET_PATIENT', payload: patient})
                dispatch(getMedicalRecord(patient.dni))
            })
            .catch(error => {
                dispatch({type: 'ERROR', payload: "Cuenta no encontrada" + error})
                dispatch({type: 'SET_STATUS', payload: 404})
            })
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('userMr', JSON.stringify(mr))
    }, [mr])

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(user))
    }, [user])

    useEffect(() => {
        async function checkCore(user) {
            //console.log("Checking Core", user)
            try {   
                var userId = app.auth().currentUser.uid;
                //console.log("Chequeando casos", user.dni, props.match.params.ws)
                if(!user.dni && props.match.params.ws !== undefined) {
                    //console.log("No hay user dni")
                }
                // Caso core_id y user_id coinciden
                if(user && user.core_id === userId) {
                    //console.log("Valid CORE")
                    dispatch({type: 'SET_STATUS', payload: 99})
                // caso core_id y user_id no coinciden PERO core_id existe
                } else if (user && user.core_id !== userId && user.core_id !== "" && user.core_id !== undefined) {
                    //console.log("Invalid core", user.core_id, " is different than ", userId, user)
                    dispatch({type: 'SET_STATUS', payload: 404})
                // caso core_id no existe pero usuario sí
                } else if(user && user.fullname && user.core_id === undefined && user.fullname.length >= 4) { 
                    //console.log("Update Core")
                    dispatch({type: 'SET_STATUS', payload: 99})
                } else if (user === null || user.dni === "") {
                    //console.log("User not found or without DNI")
                } 
            } catch(err) {
                alert("[Error001] No se pudo verificar su cuenta:", user, err)
            }
        }
        checkCore(user)
    }, [dispatch, props.match.params.ws, user])


    if (!checkStatus) {
        return <Loading />
    } else if (checkStatus === 404) {
        return <NotFound error="Usted no tiene permiso para ingresar a esta página" />
    } else if (checkStatus === 98) {
        return <GetWs routes={props} />
    } else if (checkStatus === 99) {
        return <ModulesMenu ws={user.ws} />
    }  else {
        return ""
    }
}

export default withRouter(Index)