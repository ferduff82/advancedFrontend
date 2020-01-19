
import _ from 'lodash';

export default function ValidateDates(clonedTime) {
    var _isDaytimeValid = false;
    /* Validate Day is not greater than 2 for each day of the week */
    var tempObjValidate = {};
    clonedTime.forEach((item) => {
        var getDay = item.day;
        tempObjValidate[getDay] = (tempObjValidate[getDay] || 0) + 1;
    })
    var valuesToArray = Object.values(tempObjValidate)
    for (let i = 0; i < valuesToArray.length; i++) {
        if (valuesToArray[i] > 2) {
            _isDaytimeValid = 'No se pueden seleccionar más de 2 días iguales';
            console.log('No se pueden seleccionar más de 2 días iguales');
            break;
        }
    }
    /* Validate if HourUntil is greater than HourFrom */
    if (_isDaytimeValid === false) {
        clonedTime.map((item) => {
            var getFrom = item.hourFrom.split(':'),
                getUntil = item.hourUntil.split(':');
            if (getUntil[0] !== '00') {
                if (getFrom[0] === getUntil[0]) {
                    _isDaytimeValid = 'Debe haber por lo menos una hora de diferencia entre horarios';
                    console.log('Debe haber por lo menos una hora de diferencia entre horarios');
                } else if (getFrom[0] > getUntil[0]) {
                    _isDaytimeValid = 'El valor "desde" no puede ser superior al valor "hasta"';
                    console.log('El valor "desde" no puede ser superior al valor "hasta"');
                }
            }
        })
    }
    /* Validate Múltiple Hours in one Day */
    if (_isDaytimeValid === false) {
        var daysArray = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        daysArray.forEach(function (eachDay) {
            var tempDayGather = [];
            clonedTime.forEach(function (item) {
                if (item.day === eachDay) {
                    tempDayGather.push(item);
                    if (tempDayGather.length > 1) {
                        validateCross(tempDayGather)
                    }
                }
            })
        })
        function validateCross(itemArray) {
            var hourFromArray = [],
                hourUntilArray = [],
                untilIndex = 0,
                fromIndex = 1;
            var orderedArray = _.orderBy(itemArray, 'hourFrom', 'asc');
            orderedArray.forEach(function (item) {
                hourFromArray.push(item.hourFrom);
                hourUntilArray.push(item.hourUntil);
            })
            for (let i = 0; i < hourFromArray.length; i++) {
                areHoursValid();
                untilIndex = untilIndex + 1;
                fromIndex = fromIndex + 1;
            }
            function areHoursValid() {
                if (hourUntilArray[untilIndex] >= hourFromArray[fromIndex]) {
                    _isDaytimeValid = 'Los horarios no pueden cruzarse en un mismo día';
                    console.log('Los horarios no pueden cruzarse en un mismo día');
                }
            }
        }
    }
    return _isDaytimeValid;
}
