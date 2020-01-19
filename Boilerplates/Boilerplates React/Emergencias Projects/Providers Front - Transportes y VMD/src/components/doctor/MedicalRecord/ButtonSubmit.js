
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Axios from 'axios';
import '../styles/ButtonStyles.scss';

class ButtonSubmit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			valid: false,
			isLoading: false,
			isFormValid: true,
			dataToSubmit: {}
		};
	}

	isFormCompleted(e) {
		e.preventDefault();
		if (this.props.medicalCompleted && this.props.personalCompleted && this.props.treatmentCompleted && this.props.termsCompleted) {
			this.setState({isFormValid: true});
			this.onSubmit(e);
		} else {
			this.setState({isFormValid: false});
		}
	}

	onSubmit() {
		this.makePost();
	}

	makePost() {
		let axiosConfig = { headers: { "Content-Type": "application/json" } };
		this.setState({isLoading: true});
		Axios.post('https://mr-dot-uma-v2.appspot.com/'+ 
					this.props.submitParameters.userIdA +'/'+ 
					this.props.submitParameters.userIdB +'/'+ 
					this.props.submitParameters.userIdC +'/submission', this.state.dataToSubmit, axiosConfig)
			.then(res => {
				console.log(res);
				this.setState({valid: true, isLoading: false});
			})
			.catch(err => {
				this.setState({isLoading: false})
				alert("Ocurrió un error en la conexión. Por favor verifique su conexión y vuelva a intentarlo. /n Error #" + err)
			})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			dataToSubmit: nextProps.dataSubmit
		});
	}

	render() {
		console.log(this.props.personalCompleted);
		console.log(this.props.medicalCompleted);
		console.log(this.props.treatmentCompleted);
		console.log(this.props.termsCompleted);
		if (this.state.valid === true) {
			return <Redirect to={`/${this.props.submitParameters.userIdC}/${this.props.submitParameters.userIdB}/copago/index`} />
		} else {
			return (
				<div className="p-3 submitContainer">
					{(this.state.valid !== true && this.state.isLoading) ? <div><div className="loading-container"></div><div className="loading spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div></div> : '' }
				  	{!this.state.isFormValid ? <div className="uncompleted-form">El formulario no está completo</div> : '' }
					<button onClick={(e) => this.isFormCompleted(e)} className='btn btn-active w-100'>Enviar</button>
				</div>
		  	);
		}
	}
}

export default ButtonSubmit;
