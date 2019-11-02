
import React from "react";
import { connect } from "react-redux";
import { validateService } from '../store/actions/validateActions';

import "../styles/components/ProfessionalData.scss"

class ProfessionalData extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            jurisdiccion: []
        };
    }

    render() {

        const { isServiceValid } = this.props;

        if (this.props.dataInfo) {

            const { matriculas, especialidad, rol } = this.props.dataInfo.provider;

            var filterCABA = Object.values(matriculas).filter(function(item) {
                return item.jurisdiccion === "CABA";
            }) 
            var notCABA = Object.values(matriculas).filter(function(item) {
                return item.jurisdiccion !== "CABA";
            }) 

            return (
                <div className="professionalDataWrapper">
                    <div className="d-flex list-container">
                        <div className="matricula">
                            <strong>- Matricula:</strong>
                        </div>
                        <div className="matriculaData">
                            { filterCABA[0].matricula }
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="especialidad">
                            <strong>- Especialidad:</strong>
                        </div>
                        <div className="especialidadData">
                            { especialidad }
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="jurisdiccion">
                            <strong>- Jurisdicción:</strong>
                        </div>
                        <div className="jurisdiccionData">
                            { filterCABA[0].jurisdiccion }
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="otros">
                            <strong>- Otros:</strong>
                        </div>
                        <div className="otrosData">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Matricula</td><td>Jurisdicción</td>
                                    </tr>
                                    {notCABA.map((item, index) =>
                                        <tr key={index}>
                                            <td>{item.matricula} </td><td> {item.jurisdiccion}</td>
                                        </tr>
                                    )}
                               </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="d-flex list-container">
                        <div className="servicios">
                            <strong>- Servicio:</strong>
                        </div>
                        <div className="serviciosData">
                            <input type="text" placeholder="Ingresar Servicio" className="form-control" defaultValue={rol} onChange={(e) => this.props.validateService(e.target.value)}/>
                        </div>
                        <div>
                            { isServiceValid ? '' : 'El campo no puede estar vacío' }
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isServiceValid: state.validate.isValidValue.isValid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        validateService: (checkData) => { dispatch(validateService(checkData)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalData);