
export default function ValidateDates(patente, numeroPlazas, modelo) {

    let dataStore = [];
    var validDate = false;
    var emptyValues = [];

    dataStore.push(patente, numeroPlazas, modelo);

    dataStore.forEach(function(item) {
        if (item === null || item === undefined || item === "" || item === 'undefined' || item === false) {
            emptyValues.push(item)
        }
    })

    if (emptyValues.length > 0) {
        validDate = false;
    } else {
        validDate = true;
    }

    return validDate;
}
