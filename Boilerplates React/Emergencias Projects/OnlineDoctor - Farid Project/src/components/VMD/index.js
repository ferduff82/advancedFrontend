import React from 'react';
import {useSelector} from 'react-redux';
import WhoVmd from './WhoVmd';
import WhereVmd from './WhereVmd';
import TriageVmd from './TriageVmd';
import DoctorVmd from './DoctorVmd';

const VMD = () => {
    const stage = useSelector((state) => state.front.vmdStage)
    if(stage === "who") {
        return <WhoVmd /> 
    } else if(stage === "where") {
        return <WhereVmd />
    } else if(stage === "triage") {
        return <TriageVmd /> 
    } else if(stage === "doctor") {
        return <DoctorVmd /> 
    }
}

export default VMD