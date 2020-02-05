
import React from "react";

import '../../styles/global/generalComponents/Loading.scss';

const Loading = () => {
    return (
        <div className="loadingContainer">
            <div className="loadingBack"></div>
            <div className="loading spinner-border" role="initial">
                <span className="sr-only">Loading...</span>
            </div><br />
            <div className="loadingName">Cargando...</div>
        </div>
    )
}

export default Loading;
