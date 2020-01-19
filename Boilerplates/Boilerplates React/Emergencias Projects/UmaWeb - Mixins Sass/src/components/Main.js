import React from 'react';
import Particles from 'react-particles-js';
import { SliderMessage } from './SliderMessage';

class Main extends React.Component {
    render() {
    return(    
    <div>
        <Particles 
            canvasClassName="background"
            />
        <div id="main-background" className="parallax-container">
            <div className="section no-pad-bot">
            </div>
        </div>
        <div id="main-container" className="container">
            <br /><br />
            <SliderMessage />
        </div>
    </div>
    )
}
}


export default Main;