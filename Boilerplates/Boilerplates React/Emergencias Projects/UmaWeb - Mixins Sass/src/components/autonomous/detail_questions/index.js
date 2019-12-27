import React,{ useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import uid from '../api_uid';
import axios from 'axios';

import Loading from '../../../components/global/Loading';

import '../../../styles/autonomous/detail_questions.scss';


export default ({q1,qa_next,qa_acumulado})=>{
    const [ loading , setLoading ] = useState(false);
    const dispatch = useDispatch();

    const restartAll = ()=>{
        dispatch({type:'AUTONOMOUS_SET_STEP', payload:{active:'first_questions'}})
    }

    const nextQuestion = (resx)=>{
            const parsed_date = uid.getUid();
            getNewQuestion(parsed_date, resx);
    }

    const getNewQuestion = (parsed_date, resx)=>{
        console.log(parsed_date, resx);
        setLoading(true);
        let URL = `https://uma-v2.appspot.com/autonomous_next`;
        axios.post(URL, {
            dni: parsed_date,
            qa1: q1,
            qa_next: [`${qa_next.pregunta} .${resx}`],
            qa_acumulado: [...qa_acumulado.last, `${qa_next.pregunta} .${resx}`],
            key: qa_next.key ? qa_next.key : '0'
       },{
            headers:{ 
                'Content-Type': 'application/json'
            },
        }).then((res)=>{
            if(res.data.key === 'end'){
                console.log(res)
                dispatch({type:'AUTONOMOUS_SET_FINAL_PREDICT', payload:res.data})
                dispatch({type:'AUTONOMOUS_SET_STEP', payload:{active:'predict'}})
            }else{
                dispatch({type:'AUTONOMOUS_SET_QA_ACUMULADO', payload:{last:[...qa_acumulado.last, `${qa_next.pregunta} .${resx}`]}})
                dispatch({type:'AUTONOMOUS_SET_QA_NEXT', payload:{pregunta:[res.data.pregunta], respuesta: res.data.respuesta, key:res.data.key}})
                setLoading(false);
            }

        }).catch((e)=>{
            console.error(e);
            setLoading(false);
            alert('Ocurrió un error inesperado, por favor vuelva a intentar más tarde.')
            dispatch({type:'AUTONOMOUS_SET_STEP', payload:{active:'welcome'}})
        })
    }

    return (
        <div className={'fadeIn animated detail_question'}>
            {
                !loading ? <div>
                    <button className={'btn btn-active back-button fadeIn animated'} disabled={loading} onClick={restartAll}>
                        <i className="fas fa-angle-double-left"></i>
                    </button>
                    {qa_next.pregunta.length > 0 && (<div>
                        <div className={"question"}>
                            {qa_next.pregunta}
                        </div>

                        {qa_next.respuesta.map((possible_response,index)=>{
                            return (<div key={possible_response +''+ index } id={possible_response +''+ index} className={'possible-response fadeIn animated'}>
                                        <button className={'btn btn-active option-button'} onClick={()=>nextQuestion(possible_response)}>{possible_response}</button>
                                    </div>)
                        })}
                    </div>)}
                </div> : <Loading/>
            }
        </div>
    )
}