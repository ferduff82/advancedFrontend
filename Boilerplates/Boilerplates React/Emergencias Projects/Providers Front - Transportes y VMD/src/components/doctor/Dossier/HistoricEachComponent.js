
import React from 'react';

class HistoricEachComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			toggleHistory: 'hidden',
			gduhColor : ''
		};
	}

	toggleHistoricData() {
		var css = (this.state.toggleHistory === "hidden") ? "show" : "hidden";
    	this.setState({"toggleHistory":css});
	}

	parseDate(date) {
		var fullDate = '';
		if (date !== null) {
			const res = date.split(":");
			fullDate = res[0] + ':' + res[1];
		}
		return fullDate;
	}

	componentDidMount() {
		var gduhValue = '';
		if (this.props.dataHistoricEach.gduh === '3') {
			gduhValue = 'VERDE';
		} else if (this.props.dataHistoricEach.gduh === '2') {
			gduhValue = 'AMARILLO';
		} else {
			gduhValue = 'ROJO';
		}
		this.setState({gduhColor: gduhValue});
	}

	render() {
		return (
			<div className="row-brief d-flex">
				<div className="historic d-flex container-fluid">
					<div className='left-side'><i className="fas fa-user-md"></i></div>
					<div className={(this.state.toggleHistory === "hidden") ? "right-side p-2 position-relative ellipsis" : "right-side p-2 position-relative"}>
						<div className={(this.state.toggleHistory === "hidden") ? "first-row d-flex ellipsis" : "first-row d-flex"}>
							<div className={(this.state.toggleHistory === "hidden") ? "title-emergency ellipsis" : "title-emergency"}>
								<h6 className={(this.state.toggleHistory === "hidden") ? "ellipsis" : ""}>
									<div className="date">
										{this.parseDate(this.props.dataHistoricEach.dt)}
									</div>
									<div className={(this.state.toggleHistory === "hidden") ? "ellipsis diagnostic" : "diagnostic"}>
										{this.props.dataHistoricEach.diagnostico}
									</div>
								</h6>
							</div>
						</div>
						<div className={(this.state.toggleHistory === "hidden") ? "second-row heightFixed" : "second-row heightAuto"}>
							<div className="description-emergency">
								<p className={(this.state.toggleHistory === "hidden") ? "ellipsis mb-2" : "mb-2"}>
									{(this.props.dataHistoricEach.destino_final === null) ? "-" : this.props.dataHistoricEach.destino_final}
								</p>
								<p>
									{this.props.dataHistoricEach.epicrisis}
								</p>
							</div>
							<div className="full-description" onClick={() => this.toggleHistoricData()}>
								<i className={(this.state.toggleHistory === "hidden") ? "show material-icons" : "hidden material-icons"}>add_circle</i>
								<i className={(this.state.toggleHistory === "hidden") ? "hidden material-icons" : "show material-icons"}>remove_circle</i>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default HistoricEachComponent;
