var d = new Date()

export function currentDate() {
    var currentMonth = ('0' + (d.getMonth() + 1)).substr(-2)
    var currentDay = ('0' + d.getDate()).substr(-2)
    var currentHours = ('0' + (d.getHours())).substr(-2)
    var currentMinutes = ('0' + d.getMinutes()).substr(-2)
    var currentSeconds = ('0' + d.getSeconds()).substr(-2)
    const currentDate = [d.getFullYear(), currentMonth, currentDay].join('-') + ' ' +
    [currentHours, currentMinutes, currentSeconds].join(':');
    return currentDate
}

export function dateWoHour() {
    var currentMonth = ('0' + (d.getMonth() + 1)).substr(-2)
    var currentDay = ('0' + d.getDate()).substr(-2)
    const dateWoHour = [d.getFullYear(), currentMonth, currentDay].join('-')
    return dateWoHour
}

export function timeWoDate() {
    var currentHours = ('0' + (d.getHours())).substr(-2)
    var currentMinutes = ('0' + d.getMinutes()).substr(-2)
    const currentDate =  [currentHours, currentMinutes].join(':')
    return currentDate
}

export function yearAndMonth() {
    var currentMonth = ('0' + (d.getMonth() + 1)).substr(-2)
    const currentYandM = [d.getFullYear(), currentMonth].join('');
    return currentYandM
}

export function dateToRemaining(dateToRemain) {
    if(dateToRemain) {
        var minutesRemaining = (dateToRemain - Date.now()) / 60000 + 1
    }
    let remaining
    if(typeof minutesRemaining === "number") {
        remaining = parseInt(minutesRemaining)
    } else {
        remaining = minutesRemaining
    }
    return remaining
}