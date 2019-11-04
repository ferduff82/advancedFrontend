
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Axios from 'axios';
import Moment from 'moment';

import {GenericHeader} from '../Headers';
import StarRatings from 'react-star-ratings';
import MobileModal from '../Modal/MobileModal';
import {feedback} from '../../../config/endpoints';

import '../../../styles/generalcomponents/Survey.scss';


const SurveyComponent = (props) => {

    const [modalDisplay, setModalDisplay] = useState(false);
    const dispatch = useDispatch();
    const starsValue = useSelector((state) => state.survey.stars);
    const starsValueDriver = useSelector((state) => state.survey.starsDriver);
    const commentsValue = useSelector((state) => state.survey.comments);

    useEffect(() => {
        console.log(Moment().format('YY-MM-DD_hh-mm-ss'));
        console.log(props);
    }, [])

    function setRatingApp(value) {
        dispatch({type: 'ADD_STARS_SURVEY', payload: value})
    }

    function setRatingDriver(value) {
        dispatch({type: 'ADD_STARS_DRIVER', payload: value})
    }

    function sendDataSurvey() {

        console.log(props.match.params.ws);
        console.log(props.match.params.dni);
        console.log(props.match.params.asid);
        console.log(Moment().format('YYYY-MM-DD_hh-mm-ss').toString());
        console.log(starsValue.toString());
        console.log(starsValueDriver.toString());
        console.log(commentsValue);

        Axios.post(feedback, {
            'ws': props.match.params.ws,
            'dni': props.match.params.dni,
            'dt': '',
            'assignation_id': props.match.params.asid,
            'uma_eval': starsValue.toString(),
            'doc_eval': starsValueDriver.toString(),
            'notes': commentsValue
        }, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } })
        .then(function (response) {
            setModalDisplay(true);
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function backToTransports() {
        props.history.push("/" + props.match.params.ws);
    }

    return (
        <>
            <GenericHeader>Consulta de satisfacción</GenericHeader>
            { modalDisplay &&
                <MobileModal title="Muchas gracias!" hideCloseButton={true}>
                    <div className="contentData">Datos enviados con éxito!</div>
                    <div className="buttonContainer">
                        <button 
                            className="btn btn-active buttonSuccess"
                            onClick={() => backToTransports()}>
                            Volver a listado de traslados
                        </button>
                    </div>
                </MobileModal>}
            <div className="surveyWrapper">
                <div className="surveyMod">Como evaluaría la aplicación?</div>
                <div className="surveyMod starsValue">
                    <StarRatings
                        rating={starsValue}
                        changeRating={setRatingApp}
                        numberOfStars={5}
                        name='rating'
                        starDimension="40px"
                        starRatedColor="#42A5F6"
                        starHoverColor="#42A5F6"
                    />
                </div>
                <div className="surveyMod">Como evaluaría al transportista?</div>
                <div className="surveyMod starsValue">
                    <StarRatings
                        rating={starsValueDriver}
                        changeRating={setRatingDriver}
                        numberOfStars={5}
                        name='rating'
                        starDimension="40px"
                        starRatedColor="#42A5F6"
                        starHoverColor="#42A5F6"
                    />
                </div>
                <div className="surveyMod titleSurvey">Nos interesa conocer tu opinión</div>
                <div className="surveyMod commentsInput">
                    <textarea 
                        className="form-control commentsSurvey " 
                        placeholder={commentsValue ? commentsValue : "Ingrese sus comentarios"}
                        onChange={(e) => dispatch({type: 'ADD_COMMENTS_SURVEY', payload: e.target.value})}>
                    </textarea>
                </div>
                <div className="surveyMod commentsInput">
                    <button 
                        className="btn btn-active sendSurvey" 
                        onClick={() => sendDataSurvey()} 
                        disabled={!starsValue || !commentsValue}>Enviar</button>
                </div>
            </div>
        </>
    )
}

export default SurveyComponent;
