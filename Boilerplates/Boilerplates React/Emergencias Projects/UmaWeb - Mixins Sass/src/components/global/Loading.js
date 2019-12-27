
import React from "react";

import '../../styles/generalComponents/Loading.scss';

export default () => {

    return (
        <div className="loadingContainer">
            <div className="loadingBack"></div>
            <div className="loading spinner-border text-primary" role="initial">
                <span className="sr-only">Loading...</span>
            </div><br />
            <div className="loadingName">Cargando...</div>
        </div>
    )
}
