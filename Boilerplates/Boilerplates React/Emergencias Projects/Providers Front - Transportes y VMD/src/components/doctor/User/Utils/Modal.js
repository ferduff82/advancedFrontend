
import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import "../../../../styles/doctor/user/modal.scss"
/* 
<MobileModal hideCloseButton="" title="" children="" />
*/

const MobileModal = (props) => {
    const dispatch = useDispatch();

    if (props.overideStyles) {
        var stylesOveride = props.overideStyles;
        var modalPosition = {
            top: stylesOveride.top,
            bottom: stylesOveride.bottom,
            left: stylesOveride.left,
            right: stylesOveride.right
        };
    }

    return (
        <div className="modalContainer">
            <div className="modal-back"></div>
            <div className="mobile-modal" style={modalPosition}>
                {props.hideCloseButton ? '' : <div className="modal-close" onClick={() => dispatch({ type: 'TOGGLE_MODAL', payload: 'close' })}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>}
                <div className="modaTitle">{props.title}</div>
                <div className="modalContent">{props.children}</div>
            </div>
        </div>
    )
}

export default MobileModal;
