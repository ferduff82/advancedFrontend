import React from 'react';
import Particles from 'react-particles-js';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Pacientes extends React.Component {

    render(props) {

    const { background = "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" } = this.props;

    return(    
    <div>
        <Header />
        <Particles 
            canvasClassName="background-single"
            />
        <div></div>

        <div id="main-single" style={{backgroundImage: "url(" + background + ")"}}>
            <div className="section no-pad-bot">
            </div>
        </div>
        <div id="single-container" className="container">
            <div className="single-title-container">
                <h1><span className="single-title" style={{backgroundColor: +"#0074bb !important"}}>Medicos</span></h1>
            </div>
            <div className="single-content">
                <p>Lorem ipsum dolor <b>sit amet</b>, consectetur adipiscing elit. Vestibulum nisi magna, rhoncus et odio in, porttitor efficitur nibh. Integer dictum imperdiet lorem, ut suscipit sem dignissim vel. Morbi ut turpis eget metus suscipit iaculis a ut eros. Curabitur hendrerit vitae purus sit amet ultricies. In et tristique quam. Cras sem nisi, tincidunt pellentesque placerat at, cursus ut diam. Nunc maximus egestas ultrices. Integer eget augue tortor.
                Vestibulum at gravida erat. Fusce sollicitudin elit et vulputate bibendum. Nunc condimentum nunc quis eros finibus, eget mattis quam vehicula. Vestibulum feugiat vestibulum lobortis. In hac habitasse platea dictumst. Quisque faucibus metus sit amet varius condimentum. Morbi suscipit felis non lorem tincidunt, id mattis tortor tincidunt. Sed molestie venenatis quam.</p>
                <p>Fusce porta ligula vulputate augue vestibulum commodo. Nam interdum justo turpis, lacinia rutrum leo elementum at. Praesent malesuada pretium arcu sit amet maximus. Nam facilisis ex ac mauris condimentum, vel cursus ex feugiat. Aliquam gravida, eros non rutrum pharetra, risus dolor pellentesque odio, nec vulputate magna libero eu dolor. Cras at ultrices libero. Pellentesque orci arcu, tempor eget mattis sit amet, maximus et mauris. Integer at tortor sed libero faucibus tempor. Donec auctor felis sed sagittis scelerisque. Morbi condimentum purus sit amet semper convallis.</p>
            </div>
            <br /><br />
        </div>
        <Footer />
    </div>
    )
}
}

export default Pacientes;


