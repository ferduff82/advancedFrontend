
import React from 'react';
import '../styles/ExtraDataComponent.scss';

class BriefComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			dataOrder: []
		};
	}

	componentDidMount() { 
		const self = this;
	}
	
	render() {
		if (!this.state.isLoading) {
			var antecedentes = this.props.extraData.user.antecedentes;
			return (
				<div className="extraDataComponent">
					<div className="separator p-2">
						<strong>Alertas: </strong>
						<p>{this.props.extraData.mr.alertas ? this.props.extraData.mr.alertas : '-'}</p>
					</div>
					<div className="separator p-2">
						<strong>Alergias: </strong>
						<p>-</p>
					</div>
					<div className="separator p-2">
						<strong>Antecedentes: </strong>
						<p>
							{ antecedentes.length > 0 ? antecedentes.map(function(item) {return <div>{item}</div>}) : '-'}
						</p>
					</div>
				</div>
			)
		} else {
			return (
				<div className="loading spinner-border text-primary" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			)
		}
	}
}

export default BriefComponent;
