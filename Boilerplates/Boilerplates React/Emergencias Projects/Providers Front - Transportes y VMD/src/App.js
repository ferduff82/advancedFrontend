
import React from 'react';
import { Route, Switch } from 'react-router-dom';
/* User */
import Reset from './views/User/Reset';
import Terms from './views/Terms'
import Register from './views/User/Register';
import RegisterMedic from './views/User/RegisterMedic';
import Login from './views/User/Login';
//import ResetPassword from './components/User/ResetPassword';
/* HOME*/
import Home from './views/Home/Home';
/* Profile */
import MedicProfile from './views/User/MedicProfile';
import NotFound from './components/global/NotFound';
import Alert from './components/global/Alert/Alerts';
import { Offline } from './components/global/OnlineDetection';
/* Survey and Transport */
import PrivateRoute from './PrivateRoute';
/* Transport */
import RegisterTransport from "./views/User/RegisterTransport"
import TransportProfile from "./views/User/TransportProfile"
import Worklist from './components/Transport/Worklist';
import Travels from './components/Transport/Travels';
import Provider from './views/Provider';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

function App() {
  return (
    <div className="App">
      <Offline>
        <Alert
          alertType="danger"
          titleMessage="Usted está desconectado"
          customMessage="La mayoría de las funciones de esta aplicación no están disponibles sin conexión."
        />
      </Offline>
      <Switch>
        {/* LOGIN / REGISTER / RECOVERY */}
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/:ws?/:cuil?/register" component={Register} />
        <Route exact path="/RegisterMedic" component={RegisterMedic} />
        <Route exact path="/RegisterTransport" component={RegisterTransport} />

        <Route exact path="/:ws?/login" component={Login} />


        {/* TRANSPORT */}
        <Route exact path="/transport/worklist" component={Worklist} />
        <Route exact path="/transport/travels" component={Travels} />

        {/* VMD */}
        <Route exact path="/provider" component={Provider} />

        {/* Home */}
        <PrivateRoute exact path="/" component={Home} />

        {/* PROFILE */}
        <PrivateRoute path="/MedicProfile" component={MedicProfile} />
        <PrivateRoute path="/TransportProfile" component={TransportProfile} />

        {/* 404 or Errors handling */}
        <Route component={NotFound} />

      </Switch>
    </div>
  );
}

export default App;
