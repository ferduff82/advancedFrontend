import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DBConnection from '../../../config/DBConnection';
import moment from 'moment';
import NextTravels from './NextTravel';
import CurrentTransfer from './Travel'
// import Loading from '../GeneralComponents/Loading';
// import RejectModal from '../GeneralComponents/RejectModal';
import 'moment/locale/es';

const TravelList = (props) => {
    const dispatch = useDispatch()
    const assignations = useSelector((state) => state.assign)
    const front = useSelector((state) => state.front)
    const cid = useSelector((state) => state.assign.currentId)
    const [more, setMore] = useState(true)
    const cuitDecoded = ""

    React.useEffect(() => {
        async function query() {
            dispatch({ type: 'LOADING', payload: true })
            const firestore = DBConnection.firestore()
            let date = moment(new Date()).format('YYYY-MM-DD')
            let query = firestore.collection('assignations').doc(date).collection('VMD')
                .where("provider_id", "==", cuitDecoded).limit(50)
            let query2 = firestore.collection('providers_auth').where("cuit", "==", cuitDecoded).limit(1)
            await query2.onSnapshot({
                includeMetadataChanges: true
            }, ((snap2) => {
                let currentId = []
                snap2.forEach((data) => {
                    if (data.data().assignation_id) {
                        currentId = data.data().assignation_id.split("/")
                    }
                    dispatch({ type: 'GET_CURRENT_ID', payload: currentId[3] })
                })
            }))
            await query.onSnapshot({
                includeMetadataChanges: true
            }, async function (snapshot) {
                let assigns = []
                let current = []
                let done = []
                let validState = new RegExp("^(PREASSIGN|ASSIGN|ATT|DONE)")
                await snapshot.forEach((subDoc) => {
                    let data = subDoc.data()
                    if ((validState.test(data.current_state) && data.current_state !== "DONE") || (data.assignation_id === cid)) {
                        assigns.push(data)
                    } else {
                        done.push(data)
                    }
                })
                assigns = assigns.sort((a, b) => (a.created_dt > b.created_dt) ? 1 : ((b.created_dt > a.created_dt) ? -1 : 0));
                await dispatch({ type: 'GET_ASSIGNS', payload: assigns })
                await dispatch({ type: 'GET_DONE_ATT', payload: done })
                await dispatch({ type: 'GET_CURRENT_ATT', payload: current })
                dispatch({ type: 'LOADING', payload: false })
                if (assigns.length > 1) {
                    setMore(false)
                }
            })

        }
        query()
    }, [dispatch, cuitDecoded, cid])

    React.useEffect(() => {
        dispatch({ type: 'SET_CUIT', payload: cuitDecoded })
    }, [dispatch])

    return (
        <>
            <div className="date-container">
                <span className="apppointments-date"><b>{moment(new Date()).format('LL')}</b></span>
            </div>
            <div className="col-xs-12 d-flex justify-content-around">
                <div className="appointments-container">
                    {assignations && assignations.current.length === 0 && assignations.all.length === 0 ?
                        <div className="text-center">
                            <span><b>En este momento no hay ningun traslado pendiente. <br />Pronto se le asignará uno nuevo.</b></span>
                        </div> :
                        <>
                            {assignations.all.length >= 1 ? assignations.all.map((appoint, index) =>
                                <CurrentTransfer appointments={appoint} key={index} index={index} />) : <></>}
                        </>}
                </div>
            </div>
            {assignations.all.length > 0 &&
                <div className="d-flex justify-content-around">
                    <span className="btn btn-blue-ternary mt-3" onClick={() => dispatch({ type: 'VIEW_NEXT_ATTENTIONS' })}>Ver atenciones en cola</span>
                </div>}
            {front.showNextAtts && <NextTravels />}
            <small className="text-center">{props.more && "Te avisaremos para tu próxima atención"}</small>
        </>
    )
}

export default TravelList