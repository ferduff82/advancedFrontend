
import React from "react";
import { connect } from "react-redux";

import PersonalData from '../components/PersonalData';
import ProfessionalData from '../components/ProfessionalData';
import HolidaysData from '../components/HolidaysData';
import DayTime from '../components/DayTime';
import UploadDocumentation from '../components/UploadDocumentation';
import Axios from 'axios';

import { openDropdown } from '../store/actions/frontActions';
import { checkEvent } from '../store/actions/validateActions';

import '../styles/components/Main.scss';

class Main extends React.PureComponent {

    constructor(props) {
		super(props);
		this.state = {
            urlParam: {
				userIdA: this.props.match.params.id1,
                userIdB: this.props.match.params.id2
            },
            initialData: {}
		}
	}

    componentDidMount() {
        var that = this;
        var { userIdA, userIdB } = this.state.urlParam;
        Axios({
            url: 'https://providers-dot-uma-v2.appspot.com/provider/' + userIdA + '/' + userIdB + ''
        })
        .then(function (response) {
            console.log(response);
            that.setState({
                initialData: response
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {

        const { dropdownOpen, checkData, isDaytimeValid, isServiceValid } = this.props;
        const { data } = this.state.initialData;

        console.log(isServiceValid);
        console.log(checkData);
        console.log(isDaytimeValid);

        return (
            <div className="providerWrapper">
                <ul>
                    <li>
                        <div onClick={() => this.props.openDropdown('personalData')} className="dropdownButton alert alert-primary">Datos personales 
                            <span className="float-right">{(dropdownOpen === 'personalData') ? <i className="fas fa-minus-circle"></i> : <i className="fas fa-plus-circle"></i>}</span>
                        </div>
                        {(dropdownOpen === 'personalData') ? <PersonalData dataInfo={data}/> : ''}
                    </li>
                    <li>
                        <div onClick={() => this.props.openDropdown('professionalData')} className="dropdownButton alert alert-primary">Datos profesionales 
                            <span className="float-right">{(dropdownOpen === 'professionalData') ? <i className="fas fa-minus-circle"></i> : <i className="fas fa-plus-circle"></i>}</span>
                        </div>
                        {(dropdownOpen === 'professionalData') ? <ProfessionalData dataInfo={data}/> : ''}
                    </li>
                    <li>
                        <div onClick={() => this.props.openDropdown('timeData')} className="dropdownButton alert alert-primary">Horario 
                            <span className="float-right">{(dropdownOpen === 'timeData') ? <i className="fas fa-minus-circle"></i> : <i className="fas fa-plus-circle"></i>}</span>
                        </div>
                        {(dropdownOpen === 'timeData') ? <div className="dropdownContent"><DayTime dataInfo={data}/></div> : ''}
                    </li>
                    <li>
                        <div onClick={() => this.props.openDropdown('holidaysData')} className="dropdownButton alert alert-primary">Vacaciones 
                            <span className="float-right">{(dropdownOpen === 'holidaysData') ? <i className="fas fa-minus-circle"></i> : <i className="fas fa-plus-circle"></i>}</span>
                        </div>
                        {(dropdownOpen === 'holidaysData') ? <div className="dropdownContent"><HolidaysData dataInfo={data}/></div> : ''}
                    </li>
                    <li>
                        <div onClick={() => this.props.openDropdown('documentData')} className="dropdownButton alert alert-primary">Documento 
                            <span className="float-right">{(dropdownOpen === 'documentData') ? <i className="fas fa-minus-circle"></i> : <i className="fas fa-plus-circle"></i>}</span>
                        </div>
                        {(dropdownOpen === 'documentData') ? <div className="dropdownContent"><UploadDocumentation dataInfo={data}/></div> : ''}
                    </li>
                </ul>
                <div className="validateAndWrapper d-flex">
                    <div className="termsAndConditions">
                        <label className="d-flex">
                            <div>
                                <input type="checkbox" name="checkbox" value="value" onClick={() => this.props.checkEvent(checkData)}/>
                            </div>
                            <div className="acceptTerms">Accept Terms and Conditions</div>
                        </label>
                    </div>
                    <div className="sendContainer">
                        <button className="btn btn-active sendButton" disabled={(!isDaytimeValid || !checkData || !isServiceValid) ? true : ''} >Enviar</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dropdownOpen: state.front.dropdown.open,
        checkData: state.validate.checked.isChecked,
        isDaytimeValid: state.validate.dayTimeIsNotEmpty.isValid,
        isServiceValid: state.validate.isValidValue.isValid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openDropdown: (dataDropdown) => { dispatch(openDropdown(dataDropdown)) },
        checkEvent: (checkData) => { dispatch(checkEvent(checkData)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);
