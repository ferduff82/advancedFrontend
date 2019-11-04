
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';

import TransportRegister from './TransportRegister';
import { transportFormCompleted } from '../../../config/endpoints';

import '../../../styles/generalcomponents/TransportMain.scss';

const TransportWrapperComponent = (props) => {

    const [activated, setActivated] = useState(false);
    const getLoading = useSelector((state) => state.front.loading);
    const dispatch = useDispatch();

    useEffect(function() {
        dispatch({type: 'LOADING', payload: true})
        Axios.post(transportFormCompleted, {
            'ws': localStorage.getItem('userRegistered'),
            'dni': localStorage.getItem('userId')
        }, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } })
        .then(function (response) {
            console.log(response);
            setActivated(response);
            dispatch({type: 'LOADING', payload: false})
        })
        .catch(function (error) {
            dispatch({type: 'LOADING', payload: false})
            console.log(error);
        });
    }, [])

    return (
        <>
            <div className="transportWrapper">
                {getLoading ? 
                    <div className="loading spinner-border text-primary" role="initial">
                        <span className="sr-only">Loading...</span>
                    </div>
                :   activated ? 
                        props.history.push(`/${props.match.params.ws}/transportUserActive`) 
                    : <TransportRegister props={props}/> 
                }
            </div>
        </>
    )
}

export default TransportWrapperComponent;
