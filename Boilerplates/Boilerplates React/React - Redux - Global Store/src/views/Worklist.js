
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Axios from 'axios';

import SuccessPost from '../components/SuccessPost';
import DayList from '../components/WorklistComponents/DayList';
import WeekList from '../components/WorklistComponents/WeekList';

import { openDropdown } from '../store/actions/frontActions';

import { triggerCuit, triggerSocialWork } from '../store/actions/generalDataActions';

import '../styles/components/Main.scss';
import '../styles/components/Worklist.scss';

class Worklist extends React.PureComponent {

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
            loadingSubmit: null
		}
	}

    componentDidMount() {
        var that = this;
        var { userIdA, userIdB } = this.state.urlParam;

        that.props.triggerCuit(userIdB);
        that.props.triggerSocialWork('osep_test');

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

    switchViewType(type) {
        this.setState({
            viewType: type
        }) 
    }

    render() {

        if (this.state.loadingSubmit) {
            return (
                <SuccessPost dataSuccess={this.state.loadingSubmit}/>
            )
        } else if (this.state.initialData) {
            return (
                <div className="worklistWrapper">
                    <div className="titleOnboarding">Listado de Tareas</div>
                    <div className="typeSelectionWrapper d-flex justify-content-center">
                        <div className={this.state.viewType === 'day' ? "day active" : "day" } onClick={() => this.switchViewType('day')}>Día</div>
                        <div className={this.state.viewType === 'week' ? "week active" : "week" } onClick={() => this.switchViewType('week')}>Semana</div>
                    </div>
                    <div className="contentCalendarWrapper">
                        { this.state.viewType === 'day' ? 
                            <DayList/> : <WeekList/>
                        }
                    </div>
                    <div className="footer d-flex">
                        <Link to={"/index/" + this.state.urlParam.userIdA + "/" + this.state.urlParam.userIdB } className="userButton"><i className="fas fa-user"></i></Link>
                        <Link to={"/index/worklist/" + this.state.urlParam.userIdA + "/" + this.state.urlParam.userIdB }  className="workList active"><i className="fas fa-car-alt"></i></Link>
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
        dropdownOpen: state.front.dropdown.open
    }
}

const mapDispatchToProps = dispatch => {
    return {
        triggerSocialWork: (socialData) => { dispatch(triggerSocialWork(socialData)) },
        triggerCuit: (cuit) => { dispatch(triggerCuit(cuit)) },
        openDropdown: (dataDropdown) => { dispatch(openDropdown(dataDropdown)) }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Worklist);
