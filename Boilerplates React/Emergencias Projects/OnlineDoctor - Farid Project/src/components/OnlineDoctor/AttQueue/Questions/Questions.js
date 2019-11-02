
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {assessment_url} from '../../../../config/endpoints';
import '../../../../styles/questions.scss';

const QuestionDetail = (props) => {
    const [i, seti] = useState(0)
    const [j, setj] = useState(0)
    const answersId = useSelector(state => state.assessment.answersId)
    const assessment = useSelector((state) => state.assessment)
    const questions = useSelector((state) => state.queries.questions)
    const dispatch = useDispatch()

    // Effect that get all selected questions for the user's symptoms and save them to store
    useEffect(() => {
        function questionsForEachSymptom() {
            let selectedQuestions = []
            assessment.selectedSymptoms.forEach((symptom) => {
                let filterQuestions = questions.filter((t) => {
                    if(t.symptom === symptom) {
                        return t
                    }
                })
                console.log("SELECTED QUESTIONS:", selectedQuestions)
                selectedQuestions.push(filterQuestions[0].questions)

            })
            dispatch({type: 'SET_SELECTED_QUESTIONS', payload: selectedQuestions})
        }
        questionsForEachSymptom()
    }, [assessment.selectedSymptoms, questions, dispatch])

    // Effect that get the current question and their answers
    useEffect(() => {
        var getQuestion = assessment.selectedQuestions[i]
        let currentQuestion = {}
        console.log("GET Q: ", i, getQuestion)
        if(getQuestion && getQuestion.length >= 1) { 
            let id = getQuestion[j].id
            let title = getQuestion[j].question
            let answers = getQuestion[j].answers
            let required = getQuestion[j].required
            currentQuestion = {id, title: title, answers, required}
        }
        dispatch({type: 'SET_CURRENT_QUESTION', payload: currentQuestion})
        console.log("Current Question: ", currentQuestion)
    }, [assessment.selectedQuestions, dispatch, i, j])

    useEffect(() => {
        if(assessment.currentQuestion.required !== "") {
            let current = assessment.currentQuestion.required
            let found = answersId.find((a) => { return current === a })
            console.log("FOUND?", found)
            if(found === false) {
                console.log(found)
                // saveAnswerAndNext()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answersId, assessment.currentQuestion])

    const saveInputAndNext = (e, id, tag) => {
        e.preventDefault()
        let a = e.target.elements.inputValue.value + " " + tag
        saveAnswerAndNext('', a, id)
    }

    const saveAnswerAndNext = (q, a, id) => {
        console.log(i, j)
        let string = `${a}. ` 
        let answers = []
        answers = answersId.concat(id)
        console.log(id, answers, answersId)
        dispatch({type: 'SAVE_ANSWERS', payload: string})
        dispatch({type: 'SAVE_ANSWERS_ID', payload: answers})
        if(assessment.selectedQuestions[i][j+1]) {
            setj(j+1)
        } else if (assessment.selectedQuestions[i+1]) {
            setj(0)
            seti(i+1)
        } else {
            sendAnswers()
            seti(j+1)
        }
    }

     const sendAnswers = () => {
        const headers = { 'Content-type': 'application/json' }
        let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        let u = JSON.parse(localStorage.getItem('userData'))
        let assignation_id = JSON.parse(localStorage.getItem('currentMr'))
        let data = {
            'assignation_id': assignation_id,
            'dni': u.dni,
            'dt': date,
            'text': assessment.answers,
            'ws': u.ws
        }
        axios.post(assessment_url, data, { headers })
        .then(res => {
            console.log("Validada", res)
        })
        .catch(err => {
            console.error("Delete Label error:", err)
        })
    }

    return(
        <>
            <div className="detail-modal-content questionsContainer text-center">
                <div className="assessment-text mb-4">
                    {assessment.currentQuestion && assessment.currentQuestion.title}
                </div>
                <div className="mt-2">
                {assessment.currentQuestion.title ?
                    assessment.currentQuestion.answers.map((a, index) => {
                        return <> {a.answer !== "input" ?
                            <div className="btn btn-blue-lg mt-1 p-2" key={index}
                                onClick={(e) => saveAnswerAndNext(assessment, a.tag, assessment.currentQuestion.id)}>
                                {a.answer}
                            </div>
                        : 
                            <> 
                                <form onSubmit={(e) => saveInputAndNext(e, assessment.currentQuestion.id, a.tag)}>
                                    <input type="text" id="inputValue" name="inputValue" />
                                    <button type="submit" className="btn btn-blue-lg mt-1 p-2">Enviar</button>
                                </form>
                            </> 
                        } </>
                        })
                       : 
                       <>
                            <div className="no-more-questions">Gracias, por favor aguarde. Recibirá un mensaje de whatsapp cuando su médico esté en la sala. </div><br /> 
                            <button className="btn btn-blue-lg btn-alert" onClick={() => props.cancel()}>Cancelar consulta</button>
                            <br />
                       </>
                }
                </div>
            </div>
        </>
    )
}

export default QuestionDetail