
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//import umaLoading from '../uma_loading.svg';
import axios from 'axios';
import uid from '../api_uid';

import '../../../styles/autonomous/welcome.scss';

export default ()=>{
    const [ firstAnswer , setFirstAnswer ] = useState('');
    const [ loading , setLoading ] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = e =>{
        e.preventDefault();
        //solo generar si no es desde la app.-
        uid.setUid();
        const parsed_date = uid.getUid();
        postSimpthoms(parsed_date);
    }

    const postSimpthoms = (parsed_date)=>{
        setLoading(true);
        let URL = `https://uma-v2.appspot.com/autonomous`;
        axios.post(URL, {
            ws: '',
            dni: parsed_date,
            sex: '',
            dob: '',
            motivo_de_consulta: firstAnswer,
            lat: '',
            lon: ''   
        },{
            headers:{ 
                'Content-Type': 'application/json'
            },
        }).then((res)=>{
            dispatch({type:'AUTONOMOUS_SET_FIRST_PREDICT', payload:res.data})
            dispatch({type:'AUTONOMOUS_SET_STEP', payload:{active:'first_questions'}})
        }).catch((e)=>{
            console.error(e);
            setLoading(false);
            alert('Ocurrió un error inesperado, por favor vuelva a intentar más tarde.')
        })
    }

    const handleInputChange = e =>{
        const newValueInput = e.currentTarget.value;
        if((firstAnswer.slice(-1)===' ' && newValueInput.slice(-1) === ' ') ){
            return;
        }
        const spaceCount = (newValueInput.split(" ").length - 1);
        spaceCount <= 19 && newValueInput.length < 500 && setFirstAnswer(newValueInput);
    }

    return (
        <div className="welcome">
            <div className={"question fadeIn animated"}>
                <strong>¡Hola! </strong>Soy UMA
            </div>
            <form onSubmit={handleSubmit}>
                <div className={"answers"}>
                    <input placeholder="¿En que puedo ayudarte?"
                        value={firstAnswer}
                        onChange={handleInputChange} />
                </div>
                <button className={'btn btn-active submit'} type="submit" disabled={firstAnswer.length < 3 || loading}> 
                    {/*<img src={umaLoading} alt={'loading'} className={'uma-loading'}></img>*/}
                    Consultar
                </button>
            </form>
        </div>
    )
}
