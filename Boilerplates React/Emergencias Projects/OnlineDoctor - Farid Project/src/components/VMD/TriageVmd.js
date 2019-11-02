import React from 'react';
import {useDispatch} from 'react-redux';
import {triage} from '../../config/endpoints'
import axios from 'axios';

const WhereVmd = () => {
    const dispatch = useDispatch()

    function queryTriage() {
        let url = triage
        let data = {
            testo: "me duele la cabeza",
            testo1: "",
            testo2: "",
            d1: "",
            d2: "",
            d3: "",
            d4: ""
        }
        let headers = {}
        axios.post(url, data, headers).then((res) => 
        {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    return(
       <>
        <div className="vmd-question-card">
            <p className="vmd-question-message">Indique qué le ocurre al paciente</p>
            <input type="text" placeholder="Describa sus síntomas" />
            <button type="button" className="btn btn-send" onClick={() => dispatch({type: 'SET_VMD_STAGE', payload: "doctor"})}>Enviar</button>
        </div>
       </>
    )
}

export default WhereVmd