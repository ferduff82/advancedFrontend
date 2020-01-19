import React,{ useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import uid from '../api_uid';
import axios from 'axios';

import Loading from '../../global/Loading';

import '../../../styles/autonomous/first_questions.scss';

export default ({questions})=>{
    const [keyList, setKeyList] = useState(Object.getOwnPropertyNames(questions));
    const [actualQuestion, setActualQuestion] = useState({});
    const [qList, setQlist] = useState([]);
    const [restart, setRestart] = useState(false);
    const [firstStepEnd, setFirstStepEnd] = useState({});
    const [ loading , setLoading ] = useState(false);
    const dispatch = useDispatch();

    const nextQuestion = (resx)=>{
        setFirstStepEnd({...firstStepEnd, [actualQuestion.position]:`${actualQuestion.content['0']} .${resx}`})
        const newPosition = actualQuestion.position + 1;
        if(newPosition >= qList.length){
            setRestart(true);
            //saltar al siguiente step
            const parsed_date = uid.getUid();
            postQA1(parsed_date, resx)
        }else{
            setActualQuestion({position:newPosition, content:qList[newPosition]});        
        }
    }

    const postQA1 = (parsed_date, resx)=>{
        setLoading(true);
        dispatch({
            type:'AUTONOMOUS_SET_VALIDATION_LIST', 
            payload:{answers:Object.values({...firstStepEnd, [actualQuestion.position]:`${actualQuestion.content['0']} .${resx}`})}
        })
        let URL = `https://uma-v2.appspot.com/autonomous_next`;
        axios.post(URL, {
            dni: parsed_date,
            qa1: Object.values({...firstStepEnd, [actualQuestion.position]:`${actualQuestion.content['0']} .${resx}`}),
            qa_next: [],
            qa_acumulado: [],
            key: '0'
       },{
            headers:{ 
                'Content-Type': 'application/json'
            },
        }).then((res)=>{
            dispatch({type:'AUTONOMOUS_SET_QA_NEXT', payload:{pregunta:[res.data.pregunta], respuesta: res.data.respuesta}})
            dispatch({type:'AUTONOMOUS_SET_STEP', payload:{active:'detail_questions'}})
        }).catch((e)=>{
            console.error(e);
            setLoading(false);
            alert('Ocurrió un error inesperado, por favor vuelva a intentar más tarde.')
            dispatch({type:'AUTONOMOUS_SET_STEP', payload:{active:'welcome'}})
        })
    }

    const backQuestion = ()=>{
        const newPosition = actualQuestion.position - 1;
        setActualQuestion({position:newPosition, content:qList[newPosition]});        
    }

    const restartAll = ()=>{
        dispatch({type:'AUTONOMOUS_SET_STEP', payload:{active:'welcome'}})
    }
    useEffect(()=>{        
        let question_list = [];
        keyList.map((position)=>{
            return (question_list.push(questions[position]))
        })
        setActualQuestion({position:0, content:question_list[0]});
        setQlist(question_list);
    },[keyList, questions])


    return (
        <div className={'fadeIn animated first-question'}>
            {!loading ? <div>
                {!restart ? <>
                    <div className={'back-button'} disabled={actualQuestion.position === 0 || loading} onClick={backQuestion}>
                    <i className="fas fa-arrow-left"></i></div></>:
                <div className={'return-button'} onClick={restartAll}>Volver al Inicio</div>}
                {actualQuestion.content && (<div className="contentQuestionWrapper">
                    <div className={"question"}>
                        {actualQuestion.content['0']}
                    </div>

                    <div className="responseWrapper d-flex justify-content-center">
                    {actualQuestion.content['1'].map((possible_response,index)=>{
                        return (<div key={possible_response +''+ index + actualQuestion.position} id={possible_response +''+ index + actualQuestion.position} className={'possible-response fadeIn animated'}>
                                    <button className={'btn btn-active option-button'} onClick={()=>nextQuestion(possible_response)}>{possible_response}</button>
                                </div>)
                    })}
                    </div>
                </div>)}
            </div> : <Loading/>}
        </div>
    )
}