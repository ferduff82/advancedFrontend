import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { withRouter, Link, Prompt } from "react-router-dom"
import { validateTel, validatePass, validateCuil } from "../../utils/validations"
import "../../styles/global/Register.scss"

const Register = (props) => {
    const [tel, setTel] = useState()
    const [cuil, setCuil] = useState()
    const [pass, setPass] = useState()
    const [type, setType] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const urlWs = props.match.params.ws
        const urlCuil = props.match.params.cuil
        urlWs && localStorage.setItem('userPhone', urlWs)
        urlCuil && localStorage.setItem('userCuil', urlCuil)
    }, [])

    useEffect(() => {
        const localWs = localStorage.getItem('userPhone')
        const localCuil = localStorage.getItem('userCuil')
        localWs && setTel(localWs)
        localCuil && setCuil(localCuil)
    }, [])

    const handleForm = (e) => {
        e.preventDefault()
        const data = {
            tel, pass, type, cuil
        }
        dispatch({
            type: "SET_REGISTER_DATA",
            payload: data
        })
        // const validTel = validateTel(tel)
        const validTel = tel
        const validPass = validatePass(pass)
        // const validCuil = validateCuil(cuil)
        const validCuil = cuil

        if (
            // validTel.state && validPass.state && type && validCuil
            true
        ) {
            localStorage.setItem('userPhone', tel)
            localStorage.setItem('userCuil', cuil)
            type === "medic" ?
                props.history.replace('/RegisterMedic') :
                props.history.replace('/RegisterTransport')
        } else {
            if (!validTel.state) alert(validTel.msg)
            if (!validPass.state) alert(validPass.msg)
            if (!validCuil.state) alert(validCuil.msg)
            if (!type) alert("Faltó colocar el tipo!")
        }
    }
    return (
        <form method="POST" className="registerWrapper register-form mt-2"
            onSubmit={e => handleForm(e)}>
            {!localStorage.getItem('userPhone') ?
                <>
                    <label className="form-label" htmlFor="tel">Teléfono</label>
                    <input type="number" className="form-input" name="tel" value={tel} onChange={event => setTel(event.target.value)} />
                </>
                : ""}

            {!localStorage.getItem('userCuil') ?
                <>
                    <label className="form-label" htmlFor="cuil">CUIL</label>
                    <input type="text" className="form-input" name="cuil" value={cuil} onChange={event => setCuil(event.target.value)} />
                </>
                : ""}
            <label className="form-label" htmlFor="pass">Contraseña</label>
            <input type="password" className="form-input" name="pass" onChange={event => setPass(event.target.value)} />

            <label className="form-label" htmlFor="type"></label>
            <select onChange={e => setType(e.target.value)} className="form-input" name="type" id="">
                <option value="">Tipo</option>
                <option value="medic">Médico</option>
                <option value="transport">Transportista</option>
            </select>
            <button className="sendButtonStyles" type="submit">Continuar</button>
        </form>
    )

}

export default withRouter(Register)