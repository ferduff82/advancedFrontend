
import React from 'react';
import {withRouter} from 'react-router-dom';
import {GenericHeader} from '../components/GeneralComponents/Headers';
import Rating from '../components/OnlineDoctor/Rating/Rating';

const Feedback = () => {
    return(
        <>
            <GenericHeader>Valorar la atención</GenericHeader>
            <Rating />
        </>
    )

}

export default withRouter(Feedback)
