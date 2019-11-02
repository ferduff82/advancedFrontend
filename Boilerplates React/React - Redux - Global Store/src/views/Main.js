
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Axios from 'axios';

import PersonalData from '../components/PersonalData';
import ProfessionalData from '../components/ProfessionalData';
import UploadDocumentation from '../components/UploadDocumentation';
import SuccessPost from '../components/SuccessPost';

import { openDropdown } from '../store/actions/frontActions';
import { checkEvent, validateService } from '../store/actions/validateActions';

import '../styles/components/Main.scss';

class Main extends React.PureComponent {

    constructor(props) {
		super(props);
		this.state = {
            urlParam: {
				userIdA: this.props.match.params.id1,
                userIdB: this.props.match.params.id2
            },
            initialData: null,
            loadingSubmit: null
		}
	}

    componentDidMount() {
        var that = this;
        var { userIdA, userIdB } = this.state.urlParam;
        this.props.openDropdown('personalData');
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

    submitData(isFormValid) {
        if (!isFormValid) {

            /*
                const { dayTimeData } = this.props;
            */

            const formData = new FormData();

            formData.set('vehiculo', 'remis');

            this.setState({ loadingSubmit: 'loading' })

            const config = { headers: { 'content-type': 'multipart/form-data' } };

            Axios.post("https://providers-dot-uma-v2.appspot.com/" + this.state.urlParam.userIdB + "/alta_submission", formData, config)
                .then((response) => {
                    this.setState({ loadingSubmit: 'success' })
                }).catch((error) => {
                    this.setState({ loadingSubmit: 'failed' })
                });
        }
    }

    multipleInvalidTest(advancedValidation, isDaytimeValid) {

        var redValue = '';

        if (advancedValidation) {
            redValue = 'dropdownButton alert red alert-primary';
        } else if (!isDaytimeValid) {
            redValue = 'dropdownButton alert red alert-primary';
        } else {
            redValue = 'dropdownButton alert alert-primary';
        }
        return redValue;
    }

    render() {

        if (this.state.loadingSubmit) {
            return (
                <SuccessPost dataSuccess={this.state.loadingSubmit}/>
            )
        } else if (this.state.initialData) {
            const { dropdownOpen, checkData, isDaytimeValid, isServiceValid, advancedValidation } = this.props;
            const { data } = this.state.initialData;
    
            var isFormValid = ( !checkData ) ? true : '';

            console.log(isDaytimeValid);
            console.log(advancedValidation);
    
            return (
                <div className="providerWrapper">
                    <div className="titleOnboarding">Alta de Transportista</div>
                    <div className="listsWrapper d-flex justify-content-center">
                        <div onClick={() => this.props.openDropdown('personalData')} className="dropdownButton alert alert-primary" data-active={(dropdownOpen === 'personalData') ? 'true' : 'false'}>
                            <span><i className="fas fa-user"></i></span>
                        </div>
                        <div onClick={() => this.props.openDropdown('professionalData')} className={isServiceValid ? 'dropdownButton alert alert-primary' : 'dropdownButton alert red alert-primary'} data-active={(dropdownOpen === 'professionalData') ? 'true' : 'false'}>
                            <span><i className="fas fa-car"></i></span>
                        </div>
                        <div onClick={() => this.props.openDropdown('documentData')} data-active={(dropdownOpen === 'documentData') ? 'true' : 'false'} className="dropdownButton alert alert-primary">
                            <span><i className="fas fa-address-card"></i></span>
                        </div>
                    </div>
                    <ul>
                        <li>
                            {(dropdownOpen === 'personalData') ? <PersonalData dataInfo={data}/> : ''}
                        </li>
                        <li>
                            {(dropdownOpen === 'professionalData') ? <ProfessionalData dataInfo={data}/> : ''}
                        </li>
                        <li>
                            {(dropdownOpen === 'documentData') ? <div className="dropdownContent"><UploadDocumentation dataInfo={data}/></div> : ''}
                        </li>
                        <li>
                            <div className="validateAndWrapper">
                                <div className="termsAndConditions">
                                    <label className="d-flex justify-content-center">
                                        <div className="custom-control custom-checkbox mb-1 ml-2 mr-2">      
                                            <input type="checkbox" className="custom-control-input" id="customCheck" name="example1" onClick={() => this.props.checkEvent(checkData)}/>
                                            <label className="custom-control-label" htmlFor="customCheck"></label>
                                        </div>
                                        <div className="acceptTerms">Aceptar términos y condiciones <span>{checkData ? '' : '*' }</span></div>
                                    </label>
                                </div>
                                <div className="sendContainer">
                                    <button className="btn btn-active sendButton" disabled={isFormValid} onClick={() => this.submitData(isFormValid)}>Enviar</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="footer d-flex">
                        <Link to={"/index/" + this.state.urlParam.userIdA + "/" + this.state.urlParam.userIdB } className="userButton active" ><i className="fas fa-user"></i></Link>
                        <Link to={"/index/worklist/" + this.state.urlParam.userIdA + "/" + this.state.urlParam.userIdB }  className="workList"><i className="fas fa-car-alt"></i></Link>
                        <Link to={"/index/travels/" + this.state.urlParam.userIdA + "/" + this.state.urlParam.userIdB }  className="travels"><i className="fas fa-road"></i></Link>
                    </div>
                </div>
            )
        } else {
			return (
				<div>
					<div className="loading spinner-border text-primary" role="initial">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        dropdownOpen: state.front.dropdown.open,
        checkData: state.validate.checked.isChecked,
        serviceData: state.validate.isValidValue.data,
        holidaysData: state.calendar.calendarDates.payload,
        cvData: state.buildImages.cv.data.cv,
        tituloData: state.buildImages.titulo.data.titulo,
        seguroData: state.buildImages.seguro.data.seguro,
        afipData: state.buildImages.afip.data.afip,
        isServiceValid: state.validate.isValidValue.isValid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openDropdown: (dataDropdown) => { dispatch(openDropdown(dataDropdown)) },
        checkEvent: (checkData) => { dispatch(checkEvent(checkData)) },
        validateService: (checkData) => { dispatch(validateService(checkData)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);
