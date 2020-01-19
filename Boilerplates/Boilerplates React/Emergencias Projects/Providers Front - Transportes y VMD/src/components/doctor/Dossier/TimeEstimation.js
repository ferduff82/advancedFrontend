
import Moment from 'moment';

function TimeEstimation(AssignedTime) {

	/*
		let dateAssigned = this.state.dataUser.mr.dts.assign;
		let	dateIsOnTime = this.state.dataUser.mr.dts_preds.att;
	*/

	console.log(AssignedTime);

	var now = Moment().format('YYYY-MM-DD h:mm');
	var then = AssignedTime.mr.dts_preds_att;
	var splitHour = then.split(' ');
	var splitSemicolon = splitHour[1].split(':');
	var hoursAndMinutes = splitSemicolon[0] + ':' + splitSemicolon[1];
	var delayed = Moment(now).isBefore(then, 'minute');
	var diff = Moment.duration(Moment(now).diff(Moment(then)));
	var days = parseInt(diff.asDays()); 
	var hours = parseInt(diff.asHours()); 
	var hoursString = '';
	var minutesString = '';

	hours = hours - days * 24;
	
	var minutes = parseInt(diff.asMinutes());
	minutes = minutes - (days * 24 * 60 + hours * 60);

	if (hours > 1) {
		hoursString = ' horas, ';
	} else if (hours === 0) {
		hoursString = '';
		hours = '';
	} else if (hours === 1) {
		hoursString = ' hora, ';
	}

	if (minutes > 1) {
		minutesString = ' minutos ';
	} else if (minutes === 0) {
		minutesString = '';
	} else if (minutes === 1) {
		minutesString = ' minuto ';
	}
	
	var delayedMinutes = hours + hoursString + minutes + minutesString ;

	return {
		delayedMinutes : delayedMinutes,
		hoursAndMinutes : hoursAndMinutes,
		delayed : !delayed
	};
}

export default TimeEstimation;
