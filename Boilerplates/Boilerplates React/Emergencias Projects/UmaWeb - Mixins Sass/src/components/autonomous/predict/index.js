
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';

import '../../../styles/autonomous/predict.scss';

export default ({predicted})=>{
    
    const [top, setTop] = useState(predicted.respuesta.split("#", 6));
    const dispatch = useDispatch();

    const restartAll = ()=>{
        dispatch({type:'AUTONOMOUS_SET_STEP', payload:{active:'welcome'}})
    }

    return (
        <div className={'final-predict'}>
            <div className="title-container">Diagnóstico provisorio</div>
            <div className="container-predicts d-flex">
                <div className="left-container-predicts">
                    <div className="epicrisis">
                        <h5>Epicrísis</h5>
                        <div className={'epicrisis-prediction'}>
                            <span> {predicted.epicrisis}</span>
                        </div>
                    
                    </div>            
                    <div className="predict-first-end">
                        <h5>Diagnóstico Primario</h5>
                    
                        <div className="predict-first">
                            {top[0].slice(0,-5)}
                        </div>
                            <div className="percentage-predict"> {`${top[1]}%`}</div>                   
                    </div>
                </div>
                <div className="other-predicts">
                    <h5>Otros posibles diagnósticos</h5>
                    <div>
                    <div className="predict-first">
                        {top[2].slice(0,-5)}
                    </div>
                    <div className="percentage-predict"> {`${top[3]}%`}</div>  
                    </div>
                    <div className="predict-first">
                        {top[4].slice(0,-5)}
                    </div>
                    <div className="percentage-predict"> {`${top[5]}%`}</div> 
                </div>
            </div>
            {// 
                <button className={'return-button'} onClick={restartAll}>Volver al Inicio</button>
            }
        </div>
    )
}