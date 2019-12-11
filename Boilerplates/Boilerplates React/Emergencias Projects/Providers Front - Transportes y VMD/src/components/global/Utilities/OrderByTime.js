
import Moment from 'moment';

function OrderByTime(time = []) {
    const sortedArray = time.sort(function (a, b) {
        var aHour = new Moment(a.dts_preds.att).format('HH');
        var bHour = new Moment(b.dts_preds.att).format('HH');
        var aMinutes = new Moment(a.dts_preds.att).format('MM');
        var bMinutes = new Moment(b.dts_preds.att).format('MM');
        // compare hours first
        if (aHour < bHour) return -1;
        if (aHour > bHour) return 1;
        if (aMinutes < bMinutes) return -1;
        if (aMinutes > bMinutes) return 1;
        // couldn't break the tie
        return 0;
    });
    return sortedArray;
}

export default OrderByTime;
