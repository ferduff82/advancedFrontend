import React, {Component} from 'react'; 
import Pacientes from './Pacientes';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Home extends Component {
    render() {
        return(
        <div>
        <Header />
            <Pacientes />
        <Footer />
        </div>
    )
}
}

export default Home;