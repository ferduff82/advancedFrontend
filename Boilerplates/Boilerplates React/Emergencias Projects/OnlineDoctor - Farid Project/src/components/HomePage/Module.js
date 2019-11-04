import React from 'react';
import { Link } from "react-router-dom";

const Module = (props) => {
    return (
    <>
    {props.enabled ?    
        <div className={"module-button " + props.styles}>
            <Link to={`${props.link}`} className={"module-name"}>
                {props.children}
            </Link>
        </div>
            :
        <div className="module-button disabled-module">
            <div className={"module-name"} onClick={() => alert("Este módulo aún no se encuentra disponible en tu zona")}>
                {props.children}
            </div>
        </div>
    }
    </>)
}

export default Module