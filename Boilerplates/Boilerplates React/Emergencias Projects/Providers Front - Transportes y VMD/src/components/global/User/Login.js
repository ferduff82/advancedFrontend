
import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router";
import db from "../../../config/DBConnection";
import { AuthContext } from "./Auth.js";
import { Header } from '../Header';
import Loading from '../Utilities/Loading';
import '../../../styles/global/Login.scss';

export const SignOut = () => {
  db.auth().signOut()
  return null
}

const SignIn = (props) => {

  const dispatch = useDispatch()
  const loading = useSelector(state => state.front.loading)
  let [pass, setPass] = useState();
  let [tel, setTel] = useState();


  useEffect(() => {
    const urlWs = props.match.params.ws
    urlWs && localStorage.setItem('userPhone', urlWs)
  }, [])

  useEffect(() => {
    const localWs = localStorage.getItem('userPhone')
    localWs && setTel(localWs)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch({ type: 'LOADING', payload: true })
    if (tel.length === 10) {
      tel = setTel(`549${tel.value}`)
      console.log(tel)
    }
    try {
      await db
        .auth()
        .signInWithEmailAndPassword(`${tel}@uma-health.com`, pass)
        .then(a => {
          dispatch({ type: 'LOADING', payload: false })
          localStorage.setItem('dbUser', true)
          localStorage.setItem('userPhone', tel)
          props.history.push('/')
          console.log(a)
        })
    } catch (err) {
      console.log(err.code)
      if (err.code === "auth/user-not-found") {
        dispatch({ type: 'ALERT', payload: { title: "No se encontró el usuario", msg: "Esas intentando ingresar con un número que no existe." } })
      } else if (err.code === "auth/wrong-password") {
        dispatch({ type: 'ALERT', payload: { title: "No se encontró el usuario", msg: "Esas intentando ingresar con un número que no existe." } })
      } else {
        alert(err)
      }
      dispatch({ type: 'LOADING', payload: false })
    }
  }
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {loading ? <Loading /> : <>
        <Header>Ingresar</Header>
        <div className="col-sm-12 text-center loginWrapper">
          <form onSubmit={handleLogin}>
            <div className="text-left mt-2 ml-1">
              <label className="form-label mb-0" htmlFor="user">Teléfono</label>
            </div>
            <input className="form-control w-100" id="user" placeholder="Ingrese su teléfono" type="user" onChange={(event) => setTel(event.target.value)} value={tel} required />
            <div className="text-left ml-1 mt-2">
              <label className="form-label mb-0 mt-2" htmlFor="password">Contraseña</label>
            </div>
            <input className="form-control w-100" name="password" type="password" placeholder="Ingrese su contraseña" onChange={(event) => setPass(event.target.value)} value={pass} required />

            <button className="btn btn-blue-lg buttonSendLogin" type="submit">Ingresar</button>
          </form>
          <small className="text-center">{/* <a href={`./recovery`}>Olvidé mi contraseña</a> -  */}<a href="/register">Aún no estoy registrado</a></small>
        </div>
      </>}
    </>
  );
};

export default withRouter(SignIn);
