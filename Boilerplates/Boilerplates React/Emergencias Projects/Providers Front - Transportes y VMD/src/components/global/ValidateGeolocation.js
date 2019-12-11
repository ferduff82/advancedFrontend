
import React from "react";
import { connect } from "react-redux";

import StartWatchingLocations from './PostDriverLocations/StartWatchingLocations';

import "../../styles/transport/ValidateGeolocation.scss";

class ValidateGeolocation extends React.PureComponent {

    componentDidMount() {
        const cuil = localStorage.getItem("userCuil")
        StartWatchingLocations(cuil);
    }

    reloadLoaction() {
        window.location.reload(true);
    }

    render() {

        const { isGeoActive } = this.props;

        if (!isGeoActive) {
            return (
                <div className="validateGeolocation">
                    <div className="title">Es necesario acceder a su Ubicación para utilizar esta App</div>
                    <div className="imageHelper">
                        <a target="_blank" href={"https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DAndroid&hl=es&oco=0"}>Instrucciones para autorizar Ubicación</a>
                    </div>
                    <div className="instruction">
                        Puede volver a la App una vez activada la Ubicación.
                    </div>
                    <div className="buttonContainer">
                        <button className="btn btn-active returnToApp" onClick={() => this.reloadLoaction()}>Volver a la App</button>
                    </div>
                </div>
            )
        } else {
            return (
                ''
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        isGeoActive: state.geoActive.isGeoActive
    }
}

export default connect(mapStateToProps, null)(ValidateGeolocation);
