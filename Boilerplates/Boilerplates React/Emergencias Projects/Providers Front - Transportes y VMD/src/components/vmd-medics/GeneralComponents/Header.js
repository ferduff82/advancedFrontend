import React from 'react';
import logo from '../../../assets/logo.png';

export const Header = (props) => {
  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <div className="logo"><img src={logo} alt="UMA ONLINE" /></div>
        </div>
        <span className="header-title">{props.title}</span>
      </div>
      {props.children && <div className="subheader-container mt-2">
        <span className="subheader-title">{props.children}</span>
      </div>}
    </>
  )
}