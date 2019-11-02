
import React, { useCallback, useContext } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { withRouter } from "react-router";
import db from "../../config/DBConnection";
import { AuthContext } from "./Auth.js";
import {GenericHeader} from '../GeneralComponents/Headers';
import Loading from '../GeneralComponents/Loading';
import DBConnection from '../../config/DBConnection';
import '../../styles/generalcomponents/Login.scss';

export const SignOut = () => {
  db.auth().signOut()
  return null
}

const SignIn = (props) => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.front.loading)

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      dispatch({type: 'LOADING', payload: true})
      const { email, password } = event.target.elements;
      try {
        await db
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then(a => {
            dispatch({type: 'LOADING', payload: false})
            localStorage.setItem('dbUser', true)
            if(props.history.length > 1) {
              props.history.go(-1)
            } else {
              props.history.push('/')
            }
            console.log(a)
          })
      } catch (error) {
        alert(error);
        dispatch({type: 'LOADING', payload: false})
      }
    },
    [dispatch]
  );

  const {currentUser} = useContext(AuthContext);
  return (
    <>
      {loading && <Loading />}
      <GenericHeader>Ingresar</GenericHeader>
      <div className="col-sm-12 text-center loginWrapper">
        <form onSubmit={handleLogin}>
          <div className="text-left mt-2 ml-1">
            <label className="form-label mb-0" htmlFor="email">Email</label>
          </div>
          <input className="form-control w-100" id="email" placeholder="Ingrese su e-mail" type="email" required/>
          <div className="text-left ml-1 mt-2">
            <label className="form-label mb-0 mt-2" htmlFor="password">Password</label>
          </div>
          <input className="form-control w-100" name="password" type="password" placeholder="Ingrese su password" required/>
          <button className="btn btn-blue-lg buttonSendLogin" type="submit">Ingresar</button>
        </form>
        <small className="text-center"><a href={`./recovery`}>Olvidé mi contraseña</a> - <a href="/register">No estoy registrado</a></small>
      </div>
    </>
  );
};

export default withRouter(SignIn);
