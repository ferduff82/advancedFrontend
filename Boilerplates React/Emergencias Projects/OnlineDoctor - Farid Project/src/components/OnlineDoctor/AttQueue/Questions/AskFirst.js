
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../../../../styles/askFirst.scss';

const AskFirst = (props) => {
    const dispatch = useDispatch()
    const showAskText = useSelector(state=>state.front.showAskText)

    if(showAskText) {
        return(
            <>
            <div className="text-center assessmentContainer">
                <div className="assessment-text">
                    Mientras espera puede contestar algunas preguntas que ayudarán al médico en su atención 
                    ¿Desea responderlas?
                </div>
                <div className="d-block text-center mt-4">
                    <span className="btn btn-blue-lg p-2" onClick={() => dispatch({type: 'OPEN_QUESTIONS', payload: true})}>Sí</span>
                    <span className="btn btn-blue-lg p-2" onClick={() => dispatch({type: 'SHOW_ASK_TEXT', payload: false})}>No</span>
                </div>
            </div>
            </>
        )
    } else {
        return(
            <div className="detail-modal-content questionsContainer text-center">
            <p className="text-center">
                    <button className="btn btn-blue-lg btn-alert" onClick={() =>  props.cancel()}>Cancelar consulta</button>
            </p>
            </div>
        )
    }
}

export default AskFirst;
