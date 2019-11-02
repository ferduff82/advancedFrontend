import React from 'react';
import { Route, Switch } from 'react-router-dom';
/* VMD */
import Vmd from './views/Vmd.js';
/* History */
import History from './views/History.js';
/* User */
import GetWs from './views/GetWs';
import Reset from './views/Reset';
import Feedback from './views/Feedback';
import Terms from './views/Terms'
import UserNotFound from './views/UserNotFound';
import ResetPassword from './components/User/ResetPassword';
import Login from './components/User/Login';
import Index from './views/Index';
/* Profile */
import Profile from './views/Profile';
/* Online Doctor */
import When from './components/OnlineDoctor/WhenScreen/WhenAtt'
import Reason from './components/OnlineDoctor/Reason/'
import Rating from './components/OnlineDoctor/Rating/Rating';
import AttQueue from './components/OnlineDoctor/AttQueue';
/* Appoinements */
import {CallContainer} from './components/OnlineDoctor/StartCall/';
import Calendar from './views/Calendar';
import Specialties from './views/Specialties';
import Success from './components/Appointments/GeneralComponents/Success';
import Cart from './components/Appointments/GeneralComponents/Cart';
import Confirm from './components/Appointments/GeneralComponents/Confirm';
import Error from './components/Appointments/GeneralComponents/Error';
import Exit from './components/Appointments/GeneralComponents/Exit';
import Version from './components/GeneralComponents/Version';
import NotFound from './components/GeneralComponents/NotFound';
import Alert from './components/GeneralComponents/Alert/Alerts';
import { Offline } from './components/GeneralComponents/OnlineDetection';
/* Survey and Transport */
import Survey from './components/GeneralComponents/Transport/Survey';
import TransportMain from './components/GeneralComponents/Transport/TransportMain';
import TransportRegister from './components/GeneralComponents/Transport/TransportRegister';
import TransportUserActive from './components/GeneralComponents/Transport/TransportUserActive';
/* Survey and Transport */
import PrivateRoute from './PrivateRoute';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

function App() {
  return (
    <div className="App">
      <Offline>
          <Alert alertType="danger" titleMessage="Usted está desconectado" customMessage="La mayoría de las funciones de esta aplicación no están disponibles sin conexión." />
      </Offline>
          {/* ONLINE DOCTOR NOW */}
          <Switch>
            {/* LOGIN / REGISTER / RECOVERY */}
            <Route exact path="/getws" component={GetWs} />
            <Route exact path="/reset" component={Reset} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/:ws?/register" component={UserNotFound} />
            <Route exact path="/:ws?/login" component={Login} />
            <Route exact path="/:ws?/recovery" component={ResetPassword} />
            {/* General */}
            <Route exact path="/feedback" component={Feedback} />
            <Route exact path="/notfound/:error" component={NotFound} />
            <PrivateRoute exact path="/:ws?" component={Index} />
            <PrivateRoute exact path="/:ws/onlinedoctor/when" authed={true} component={When} />
            <PrivateRoute exact path="/:ws/onlinedoctor/reason" component={Reason} />
            <PrivateRoute exact path="/:ws/onlinedoctor/queue" component={AttQueue} />
            <Route exact path="/:ws/onlinedoctor/attention/:token?" component={CallContainer} />
            <PrivateRoute exact path="/:ws/onlinedoctor/rating" component={Rating} />
            {/* VMD */}
            <Route exact path="/:ws/vmd" component={Vmd} />
            {/* MY HISTORY */}
            <PrivateRoute exact path="/:ws/history/:record?" component={History} />
            <PrivateRoute from="/:ws/record" to="/:ws/history/" />
            {/* PROFILE */}
            <PrivateRoute path="/:ws?/profile/" component={Profile} />
            {/* APPOINTMENTS */}
            <Route exact path="/:dni/:ws/appointments/online" component={Specialties} />
            <Route exact path="/:dni/:ws/appointments/online/:specialty/calendar" component={Calendar} />
            <Route exact path="/:dni/:ws/appointments/online/confirm" component={Confirm} />
            <Route exact path="/:dni/:ws/appointments/online/cart" component={Cart} />
            <Route exact path="/:dni/:ws/appointments/online/success" component={Success} />
            <Route exact path="/:dni/:ws/appointments/online/error" component={Error} />
            <Route exact path="/:dni/:ws/appointments/online/exit" component={Exit} /> 
            {/* TRANSPORT */}
            <Route exact path={"/survey/ws=:ws&asid=:asid&dni=:dni"} component={Survey} />
            <Route exact path={"/:ws/transport"} component={TransportMain} />
            <PrivateRoute exact path={"/:ws/transportUserActive"} component={TransportUserActive} />
            {/* MANUAL ACTIONS */}
            <Route component={NotFound} />
          </Switch>
  </div>
  );
}

export default App;
