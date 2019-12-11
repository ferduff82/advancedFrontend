import React, { Component } from 'react';
import '../../styles/App.scss';

class Terms extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className="container-fluid p-5 text-sm-left">
          <h6>TÉRMINOS Y CONDICIONES UMA PILOTO <br />(Private Preview)</h6>
          <ul class="list-unstyled align-left">
          <li>TODAS la atenciones son simuladas -ficticias- en sus síntomas y clasificaciones.</li>
          <li>TODAS las fichas médicas (Ficha de atención médica) corresponderán a situaciones ficticias.</li>
          <li>Durante la realización simulada de la atención se le requerirá permiso para obtener la localización, dicho dato es necesario para calcular la cercanía al paciente.</li>
          <li>Los datos y documentos personales, datos de localización y datos médicos tienen un uso estrictamente enmarcado en salud y bienestar</li>
          <br />
          <h5>Protección de datos</h5>
          <br />
          <li>Los datos y documentos personales poseen carácter confidencial y no serán difundidos ni compartidos con terceros.</li>
          <li>Los datos de localización poseen carácter confidencial y no serán difundidos ni compartidos con terceros.</li>
          <li>El historial del paciente (Dossier) contiene datos personales regulados por la ley 26.529</li>
          <li>El historial del paciente (Dossier) contiene datos médicos o  datos sensibles como los identifica la ley 25.326.</li>
          <li>El secreto profesional médico regulado en la ley 17.132 de Ejercicio de la Medicina, como el deber de confidencialidad derivan del respeto a la intimidad y dignidad del paciente.</li>
          </ul>
          </div>
        </header>
      </div>
    );
  }
}

export default Terms;
