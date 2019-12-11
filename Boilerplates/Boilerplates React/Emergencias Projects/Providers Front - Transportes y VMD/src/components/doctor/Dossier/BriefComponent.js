
import React from 'react';
import '../styles/BriefComponent.scss';

class BriefComponent extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			dataOrder: []
		};
	}

	componentDidMount() { 
		const self = this;

		console.log(self.props.briefData);

		let isDataReceived = setInterval(function() {
			if (self.props.briefData) { 
				self.reorderList(self.props.briefData);
				clearInterval(isDataReceived);
			}
		}, 100);
	}

	reorderList(dataObject) {

		let reorderedList = [];

		Object.keys(dataObject.history.stats).map((p, index) => {

			if (p === 'dias_ultima_atencion') {
				reorderedList.push({ number: dataObject.history.stats[p], id: "Días desde la última atención", color: "grayBack" });
			} else if (p === 'nro_traslados') {
				reorderedList.push({ number: dataObject.history.stats[p], id: "N° de derivaciones", color: "grayBack" });
			}

			/* Removed Colors, just "Días desde la última atención" was left

			if (p === 'total_atenciones') {
				reorderedList.splice(1, 1, { number: dataObject.history.stats[p], id: "N° total de atenciones", color: "grayBack" });
			} else if (p === 'rojos_previos') {
				reorderedList.splice(2, 1, { number: dataObject.history.stats[p], id: "N° de rojos previos", color: "redBack" });
			} else if (p === 'verdes_previos') {
				reorderedList.splice(4, 1, { number: dataObject.history.stats[p], id: "N° de verdes previos", color: "greenBack" });
			} else if (p === 'amarillos_previos') {
				reorderedList.splice(3, 1, { number: dataObject.history.stats[p], id: "N° de amarillos previos", color: "yellowBack" });
			} else if (p === 'nro_traslados') {
				reorderedList.splice(5, 1, { number: dataObject.history.stats[p], id: "N° de traslados", color: "grayBack" });
			} else {
				reorderedList.splice(0, 1, { number: dataObject.history.stats[p], id: "Días desde la última atención", color: "grayBack" });
			}

			*/
		})

		this.setState({
			dataOrder: reorderedList
		});
	}
	
	render() {
		return (
			<div className="briefComponent container-fluid">
				<ul>
					{this.state.dataOrder.map((p, index) => 
						<li key={index}>{	  			
							<div className="row-brief d-flex">
								<div className={"left-column-brief " + this.state.dataOrder[index].color}>
									{this.state.dataOrder[index].number}
								</div>
								<div className="right-column-brief">{this.state.dataOrder[index].id}</div>
								<div className={"right-color " + this.state.dataOrder[index].color}></div>
							</div>
						}</li>
					)}
				</ul>
			</div>
		)
	}
}

export default BriefComponent;
