import React from 'react';
import logo from '../assets/logo.png';

const neuralVisualization = () => {

}

class Corporate extends React.Component {
    
    componentDidMount() {

    }
    
    render() {
    return(
    <div>
        <div className="corporate-container col s12">
            <canvas id="corporate-canvas"></canvas>
            <img src={logo} alt="UMA" className="corporate-logo" />
        </div>
    </div>
    )
    }
}

export default Corporate;