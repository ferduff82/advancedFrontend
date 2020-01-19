
import React from "react";
import Alert from "../Alert/Alerts";

class Loading extends React.PureComponent {

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
                <div className="loading spinner-border text-primary" role="initial">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="loadingName">Cargando...</div>
            </div>
        )
    }
}

export default Loading;
