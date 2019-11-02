
import React from 'react';
import {useDispatch} from 'react-redux';
import '../../../styles/modal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

/* 
<MobileModal hideCloseButton="" title="" children="" />
*/

const MobileModal = (props) => {

    const dispatch = useDispatch();

    return(
        <div className="modalContainer">
            <div className="modal-back"></div>
            <div className="mobile-modal">
                {props.hideCloseButton ? '' : <div className="modal-close" onClick={() => dispatch({type: 'TOGGLE_DETAIL'})}>
                <FontAwesomeIcon icon={faTimesCircle}/>
            </div>}
                <div className="modaTitle">{props.title}</div>
                <div className="modalContent">{props.children}</div>
            </div>
        </div>
    )
}

export default MobileModal;
