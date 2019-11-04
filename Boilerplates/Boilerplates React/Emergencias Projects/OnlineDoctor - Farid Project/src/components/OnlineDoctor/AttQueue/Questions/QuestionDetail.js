import React from 'react';
import MobileModal from '../../../GeneralComponents/Modal/MobileModal';
import migraine from '../../../../assets/migraine_head.png';

const QuestionDetail = () => {
    let def = "Una migraña es un dolor de cabeza pulsátil e intenso que habitualmente afecta a un lado de la cabeza, aunque puede afectar a ambos."
    
    return(
        <>
            <div className="modal-back"></div>
            <MobileModal>
                <div className="detail-modal-content">
                    <img src={migraine} className="detail-modal-img" alt="Migraña" />
                    <span className="detail-modal-text">{def}</span>
                </div>
            </MobileModal>
        </>
    )
}

export default QuestionDetail