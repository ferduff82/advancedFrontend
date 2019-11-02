import React from 'react';
import {withRouter} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import axios from 'axios';
import {feedback} from '../../../config/endpoints'

const Rating = (props) => {
    const [ratingApp, setRatingApp] = React.useState(0)
    const [ratingMed, setRatingMed] = React.useState(0)
    const [notes, setNotes] = React.useState("")

    function submitRating() {
        let headers = {'Content-Type': 'Application/Json'}
        try {
            let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            let u = JSON.parse(localStorage.getItem('userData'))
            let mr = JSON.parse(localStorage.getItem('userMr'))
            let assignation_id = JSON.parse(localStorage.getItem('currentMr'))

            let data = {
                'ws': u.ws,
                'dni': u.dni,
                'dt': date,
                'assignation_id': assignation_id,
                'uma_eval': ratingApp.toString(),
                'doc_eval': ratingMed.toString(),
                'notes': notes
            }
            if(!assignation_id && mr[0] && mr[0].assignation_id) {
                data = { ...data, 
                        'assignation_id': mr[0].assignation_id,
                }
            }
            console.log(data)
            axios.post(feedback, data, headers)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) =>{
                    console.log(err)
                })
            props.history.push('/')
        } catch (err) {
            props.history.push('/')
        }
    }

    return (
    <>
{/*     <div>
        <GenericHeader>Califique la consulta</GenericHeader>
    </div> */}
    <div className="ratings-container text-center p5">
        <label>¿Cómo evaluaría la aplicación?</label>
            <StarRatings
                rating={ratingApp}
                changeRating={setRatingApp}
                numberOfStars={5}
                name='rating'
                starDimension="40px"
                starRatedColor="#42A5F6"
                starHoverColor="#0071F2"
            />
        <label>¿Cómo evaluaría al médico?</label>
            <StarRatings
                    rating={ratingMed}
                    changeRating={setRatingMed}
                    numberOfStars={5}
                    name='rating'
                    starDimension="40px"
                    starRatedColor="#42A5F6"
                    starHoverColor="#0071F2"
                />
        <textarea placeholder="Comentarios sobre la atención" onChange={(e) => setNotes(e.target.value)}></textarea>
        <button className="btn btn-blue-lg mt-5" onClick={() => submitRating()}>Enviar</button>
    </div>
    </>)
}

export default withRouter(Rating)