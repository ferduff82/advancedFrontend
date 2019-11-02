
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Axios from 'axios';

import SuccessPost from '../components/SuccessPost';
import GetPaydComponent from '../components/GetpaydComponent';

import '../styles/components/Main.scss';
import '../styles/components/Travels.scss';

class Travels extends React.PureComponent {

    constructor(props) {
		super(props);
		this.state = {
            urlParam: {
				userIdA: this.props.match.params.id1,
                userIdB: this.props.match.params.id2
            },
            viewType: 'day',
            viewWeekType: 'day',
            initialData: null,
            loadingSubmit: null,
            displayModalPay: false
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

    showModal() {
        this.setState({displayModalPay: true});
    }

    hideModal() {
        this.setState({displayModalPay: false});
    }

    render() {

        if (this.state.loadingSubmit) {
            return (
                <SuccessPost dataSuccess={this.state.loadingSubmit}/>
            )
        } else if (this.state.initialData) {
            return (
                <div className="travelsWrapper">
                    <div className="titleOnboarding">Listado de Viajes</div>

                    <div className="tableContainer">
                        <table>
                            <thead>
                                <tr>
                                    <th>Pedido por</th>
                                    <th>Contact</th>
                                    <th>Country</th>
                                    <th>Costo</th>
                                    <th>KMs</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Alfreds Futterkiste</td>
                                    <td>Maria Anders</td>
                                    <td>Germany</td>
                                    <td>Germany</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Alfreds Futterkiste</td>
                                    <td>Maria Anders</td>
                                    <td>Germany</td>
                                    <td>Germany</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Alfreds Futterkiste</td>
                                    <td>Maria Anders</td>
                                    <td>Germany</td>
                                    <td>Germany</td>
                                    <td>13</td>
                                </tr>
                                <tr>
                                    <td>Alfreds Futterkiste</td>
                                    <td>Maria Anders</td>
                                    <td>Germany</td>
                                    <td>Germany</td>
                                    <td>14</td>
                                </tr>
                                <tr>
                                    <td>Alfreds Futterkiste</td>
                                    <td>Maria Anders</td>
                                    <td>Germany</td>
                                    <td>Germany</td>
                                    <td>15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="getPaydContainer">
                        <button className="btn btn-active getPayd" onClick={() => this.showModal()}>Cobrar Viajes</button>
                    </div>
                    {this.state.displayModalPay ? 
                        <div className="getPaydModal">
                            <div className="getPaydModalContent">
                                <div className="headerPayContainment d-flex">
                                    <h6>Cobrar viajes</h6>
                                    <div className="closeModal" onClick={() => this.hideModal()}>
                                        <i className="fas fa-times"></i>
                                    </div>
                                </div>
                                <GetPaydComponent/>
                            </div>
                        </div>
                    : ''}
                    <div className="footer d-flex">
                        <Link to={"/index/" + this.state.urlParam.userIdA + "/" + this.state.urlParam.userIdB } className="userButton"><i className="fas fa-user"></i></Link>
                        <Link to={"/index/worklist/" + this.state.urlParam.userIdA + "/" + this.state.urlParam.userIdB }  className="workList"><i className="fas fa-car-alt"></i></Link>
                        <Link to={"/index/travels/" + this.state.urlParam.userIdA + "/" + this.state.urlParam.userIdB }  className="travels active"><i className="fas fa-road"></i></Link>
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
  
export default connect(null, null)(Travels);
