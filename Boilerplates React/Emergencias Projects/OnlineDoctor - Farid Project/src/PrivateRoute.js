import React, { useEffect, useState, useContext } from "react";
import {useSelector} from 'react-redux';
import { Route, withRouter } from "react-router-dom";
import { AuthContext } from "./components/User/Auth";
import LoginComponent from "./components/User/Login";
import Loading from './components/GeneralComponents/Loading';


const Login = () => {
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    let timeout = setTimeout(() => setDelay(true), 2000)
    return () => clearTimeout(timeout)
  }, [])

  if(delay) {
    return  <LoginComponent />
  } else {
    return <Loading />
  }
}

const PrivateRoute = ({ component: RouteComponent, authed, ...rest }) => {
  const {currentUser} = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? <RouteComponent {...routeProps} /> :  <Login />
      }
    />
  );
};


export default withRouter(PrivateRoute)