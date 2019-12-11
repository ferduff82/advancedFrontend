
import React, { Component } from "react";
import Alert from "./Alerts";

import '../../styles/generalComponents/Loading.scss';

class Loading extends Component {

    constructor(props) {
		super(props);
		this.state = {
            displayAlert: false
		}
    }

    componentDidMount() {
        var that = this;
        this.triggerAlert = setTimeout(function() {
            that.setState({
                displayAlert: true
            })
        } , 13000);
    }

    componentWillUnmount() {
        clearTimeout(this.triggerAlert);
    }

    render() {
        return (
            <div className="loadingContainer">
                {this.state.displayAlert ? 
                    <Alert alertType="danger" titleMessage="Hubo un problema con la conexión" customMessage="Reintente en unos minutos..." timerRemove="10000000" positionBottom="0"></Alert>
                : ''}
                <div className="loadingBack"></div>
                <div className="loading spinner-border text-primary" role="initial">
                    <span className="sr-only">Loading...</span>
                </div><br />
                <div className="loadingName">Cargando...</div>
            </div>
        )
    }
}

export default Loading;
