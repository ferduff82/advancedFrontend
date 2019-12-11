import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import '../../../styles/global/Modal.scss'

const RejectModal = (props) => {
    const dispatch = useDispatch()
    const [msg, setMsg] = React.useState("")

    function aceptPreassign() {
        dispatch({ type: 'LOADING', payload: true })
        let url = "https://providers-dot-uma-v2.appspot.com/preassign_response"
        let data = {
            cuit: props.cuit,
            response: msg
        }
        const headers = { 'Content-type': 'application/json' }
        if (msg !== "") {
            axios.post(url, data, { headers })
                .then(function (res) {
                    console.log("Ok")
                    dispatch({ type: 'HANDLE_REJECT_MODAL' })
                    dispatch({ type: 'LOADING', payload: false })
                })
                .catch(function (res) {
                    console.log("No ok", res)
                    dispatch({ type: 'LOADING', payload: false })
                    alert('Falló el envío. Compruebe su conexión a internet y vuelva a intentarlo.')
                })
        } else {
            alert("Debes especificar motivo")
            dispatch({ type: 'LOADING', payload: false })

        }
    }

    function handleChange(e) {
        console.log(e.target.value)
        setMsg(e.target.value);
    }

    return (
        <>
            <div className="ModalTemplate">
                <div className="modalBack"></div>
                {console.log(props)}
                <div className="modalContentContainer">
                    <div className="modalContent">
                        <div className="modal-close" onClick={() => dispatch({ type: 'HANDLE_REJECT_MODAL' })}><FontAwesomeIcon icon={faTimesCircle} /></div>
                        <div className="modal-form">
                            <input type="text" className="input-modal" placeholder="¿Por qué motivo rechaza la asignación?" onChange={(e) => handleChange(e)} />
                            <button className="btn btn-outline-info moda-btn-send" onClick={() => aceptPreassign("")}>Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RejectModal;