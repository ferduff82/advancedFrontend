
import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';

import FirstStep from '../../../views/UserNotFound';
import SecondStep from './TransportOnboardingSecondStep';
import ThirdStep from './TransportOnboardingThirdStep';

import '../../../styles/generalcomponents/TransportMain.scss';

const TransportWrapperComponent = (props) => {

    const stepPosition = useSelector((state) => state.front.paginationTransport);

    function showStep() {
        return(
            <div className="stepsContainer d-flex justify-content-center">
                <div className={stepPosition === 1 ? "secondStep active" : "secondStep" }>1</div>
                <div className={stepPosition === 2 ? "thirdStep active" : "thirdStep" }>2</div>
            </div>
        ) 
    }        

    function goToStepForm() {
        if (stepPosition === 1) {
            return( <SecondStep/> )
        } else if (stepPosition === 2) {
            return( <ThirdStep props={props.props}/> )
        }
    }

    return (
        <>
            <div className="transportWrapper">
                { showStep() }
                { goToStepForm() }
            </div>
        </>
    )
}

export default TransportWrapperComponent;
