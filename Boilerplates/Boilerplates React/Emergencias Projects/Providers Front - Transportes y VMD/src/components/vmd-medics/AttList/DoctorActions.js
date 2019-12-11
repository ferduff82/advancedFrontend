import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const DoctorActions = (props) => {
    const { dni, ficha, cuit, status } = props
    const dispatch = useDispatch()

    function aceptPreassign(res) {
        dispatch({ type: 'SET_LOADING' })
        let url = "https://providers-dot-uma-v2.appspot.com/preassign_response"
        let data = {
            cuit: cuit,
            response: res
        }
        const headers = { 'Content-type': 'application/json' }
        axios.post(url, data, { headers })
            .then(function (res) {
                console.log("Ok")
                dispatch({ type: 'SET_LOADING' })

            })
            .catch(function (res) {
                console.log("No ok", res)
                dispatch({ type: 'SET_LOADING' })
            })
    }

    function onDestination(res) {
        dispatch({ type: 'SET_LOADING' })
        let url = "https://providers-dot-uma-v2.appspot.com/notify_att"
        let data = {
            cuit: cuit
        }
        const headers = { 'Content-type': 'application/json' }
        axios.post(url, data, { headers })
            .then(function (res) {
                dispatch({ type: 'SET_LOADING' })

            })
            .catch(function (res) {
                console.log("No ok", res)
                dispatch({ type: 'SET_LOADING' })
            })
    }

    if (status === "PREASSIGN") {
        return (
            <div>
                <span className="btn btn-blue" onClick={() => aceptPreassign("")}>Tomar atención</span>
                <span className="btn btn-blue-secondary mt-1" onClick={() => dispatch({ type: 'HANDLE_REJECT_MODAL' })}>No tomar esta atención</span>
            </div>
        )
    } else if (status === "ASSIGN") {
        return (
            <div>
                <a href={`https://dossier-dot-uma-v2.appspot.com/${dni}/${ficha}/index`} rel="noopener noreferrer"><span className="btn btn-blue">Ver Dossier</span></a>
                <span className="btn btn-blue-secondary mt-1" onClick={() => onDestination()}>Llegué a destino</span>
            </div>
        )
    } else if (status === "ATT") {
        return (
            <div>
                <a href={`https://dossier-dot-uma-v2.appspot.com/${dni}/${ficha}/index`} rel="noopener noreferrer"><span className="btn btn-blue">Ver Dossier</span></a>
                <a href={`https://medicalreport-dot-uma-v2.appspot.com/${dni}/${ficha}/${cuit}/form/index`} rel="noopener noreferrer"><span className="btn btn-blue-secondary mt-1">Completar ficha médica</span></a>
            </div>
        )
    } else if (status === "DONE") {
        return (
            <div>
                <a href={`https://dossier-dot-uma-v2.appspot.com/${dni}/${ficha}/index`} rel="noopener noreferrer"><span className="btn btn-blue">Ver Dossier</span></a>
                <a href={`https://medicalreport-dot-uma-v2.appspot.com/${cuit}/${ficha}/copago/index`} rel="noopener noreferrer"><span className="btn btn-blue-secondary mt-1">Completar copago</span></a>
            </div>
        )
    } else {
        return (<></>)
    }
}

export default DoctorActions