import React from 'react';
import { useSelector } from 'react-redux';
import Welcome from './welcome';
import FirstStep from './first_questions';
import DetailQuestions from './detail_questions';
import Predict from './predict';
import '../../styles/autonomous/autonomous.scss';
import '../../styles/animations/animate.css';


export default ()=>{
    const step = useSelector((state)=>state.autonomous.current_step);
    const first_predict = useSelector((state)=>state.autonomous.first_predict);
    const to_predict = useSelector((state)=>state.autonomous.to_predict);
    const qa_next = useSelector((state)=>state.autonomous.qa_next);
    const qa_acumulado = useSelector((state)=>state.autonomous.qa_acumulado);
    const final_predict = useSelector((state)=>state.autonomous.final_predict);
    return (
        <div className="autonomous">
            {step.active === 'welcome' && <Welcome></Welcome>}
            {step.active === 'first_questions' && <FirstStep questions={first_predict} ></FirstStep>}
            {step.active === 'detail_questions' && <DetailQuestions q1={to_predict.answers} qa_next={qa_next} qa_acumulado={qa_acumulado}></DetailQuestions>}
            {step.active === 'predict' && <Predict predicted={final_predict}></Predict>
            }
        </div>
    )
}