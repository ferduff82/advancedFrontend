
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';

import Att from '../../views/Att';
import StartUsingUma from '../../views/StartUsingUma';

import logo from '../../assets/logo.png';
import '../../styles/App.scss';

const Working = (props) => {

  const [modalAttention, setModalAttention] = useState(false);
  const [modalStartUma, setModalStartUma] = useState(false);

  const handleModalAttention = value => {
    setModalAttention(value);
  };

  const handleModalStartUma = value => {
    setModalStartUma(value);
  };

  const goToDoctorOnline = () => {
    window.open('https://umaonline-doctor.web.app/', '_blank');
  }

  return (
    <div className="AppContainer">
      { modalAttention ? <Att closeModal={handleModalAttention}/> : '' }
      { modalStartUma ? <StartUsingUma closeModal={handleModalStartUma}/> : '' }
      <header>
        <div className="switchToDoctor d-flex">
          <div className="doctorRegister p-3">Ingresar como doctor</div>
          <div className="iconSwitchToDoctor">
            <FontAwesomeIcon icon={faUserMd} onClick={() => goToDoctorOnline()}/>
          </div>
        </div>
      </header>
      <main className="App-main">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="d-flex">
          <div className="mainButton">
            <button className="btn btn-active" onClick={() => setModalStartUma(true)}>Comenzar a usar UMA</button>
          </div>
        </div>
      </main>
      <footer>
        <div className="footerButtons">
          <button className="btn btn-active" onClick={() => setModalAttention(true)}>Verificar código</button>
        </div>
      </footer>
    </div>
  );
}

export default Working;
