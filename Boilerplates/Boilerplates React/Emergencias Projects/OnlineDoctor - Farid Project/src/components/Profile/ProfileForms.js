import React from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import {user_online} from '../../config/endpoints';

const handleSubmit = (e, d, dispatch) => {
    e.preventDefault()
    const { corporate, corporateNum, address, piso, ws, email } = e.target.elements;
    let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    let corp
    if(corporateNum === ""){
        corp = corporate.value.concat(" ", corporateNum.value)
    }
    let data = {
        core_id: d.core_id,
        dni: d.dni,
        sex: d.sex,
        dob: d.dob,
        address: address.value || d.address,
        piso: piso.value || d.piso,
        ws: ws.value || d.ws,
        dt: date || "",
        corporate: corp || d.corporate,
        fullname: d.fullname,
        email: email.value || d.email
    }
    let headers = { ContentType: 'Application/json' }
    dispatch({type: 'LOADING', payload: true})
    axios.post(user_online, data, headers)
        .then((res) => {
            setTimeout(() => {
                let newUserData = {...d, ...data}
                localStorage.setItem('userData', JSON.stringify(newUserData))
                console.log(newUserData)
                dispatch({type: 'SET_STATUS', payload: 99})
                dispatch({type: 'TOGGLE_DETAIL'})
                setTimeout(() => dispatch({type: 'LOADING', payload: false}), 1500)
            }, 2000)
        })
        .catch((err) => {
            setTimeout(() => {
                dispatch({type: 'SET_STATUS', payload: 99})
                setTimeout(() => dispatch({type: 'LOADING', payload: false}), 1500)
            }, 2500)
        })
}


export const PersonalData = (props) => {
    const dispatch = useDispatch()
    return (
        <form className="registerWrapper register-form mt-2" onSubmit={(e) => handleSubmit(e, props.data, dispatch)}>
            <label className="form-label mb-0" htmlFor="corporate">
                <small>Obra social / prepaga / seguro</small>
            </label>
            <input type="text" className="form-control" name="corporate" />
            <label className="form-label mb-0" htmlFor="corporateNum">
                <small>Número de obra social / prepaga / seguro</small>
            </label>
            <input type="text" className="form-control" name="corporateNum" />
            <input type="hidden" name="address" />
            <input type="hidden" name="piso" />
            <input type="hidden" name="ws" />
            <input type="hidden" name="email" />
            <button className="btn btn-blue-lg m-2" type="submit">Editar</button>
        </form>
    )
}

export const ContactData = (props) => {
    const dispatch = useDispatch()
    return (
        <form className="registerWrapper register-form mt-2" onSubmit={(e) => handleSubmit(e, props.data, dispatch)}>
            <label className="form-label mb-0" htmlFor="email">
                <small>Email</small>
            </label>
            <input type="email" className="form-control" name="email" />
            <label className="form-label mb-0" htmlFor="phone">
                <small>Teléfono</small>
            </label>
            <input type="tel" className="form-control" name="phone" />
            <label className="form-label mb-0" htmlFor="address">
                <small>Dirección</small>
            </label>
            <input type="text" className="form-control" name="address" />
            <label className="form-label mb-0" htmlFor="piso">
                <small>Piso</small>
            </label>
            <input type="text" className="form-control" name="piso" />
            <input type="hidden" name="ws" />
            <input type="hidden" name="corporate" />
            <input type="hidden" name="corporateNum" />
            <button className="btn btn-blue-lg m-2" type="submit">Editar</button>
        </form>
    )
}

export const HealtData = (props) => {
    const dispatch = useDispatch()
    return (
        <form className="registerWrapper register-form mt-2" onSubmit={(e) => handleSubmit(e, props.data, dispatch)}>
            <label className="form-label mb-0" htmlFor="weight">
                <small>Peso</small>
            </label>
            <input type="number" className="form-control" name="weight" />
            <label className="form-label mb-0" htmlFor="height">
                <small>Altura</small>
            </label>
            <input type="number" className="form-control" name="height" />
            <label className="form-label mb-0" htmlFor="chronic">
                <small>Enfermedades crónicas</small>
            </label>
            <input type="text" className="form-control" name="chronic" />
            <label className="form-label mb-0" htmlFor="family">
                <small>Antecedentes</small>
            </label>
            <input type="text" className="form-control" name="family" />
            <button className="btn btn-blue-lg m-2" type="submit">Editar</button>
        </form>
    )
}

export const ProfilePic = () => {
    return (
        <>
            <label className="form-label mb-0" htmlFor="avatar">
                <small>Subir una nueva imagen</small>
            </label>
            <input type="file" className="form-control" name="avatar" aria-label="Subir imagen" aria-controls="Imagen"/>
            <button className="btn btn-blue-lg m-2" type="submit">Subir</button>
        </>
    )
}