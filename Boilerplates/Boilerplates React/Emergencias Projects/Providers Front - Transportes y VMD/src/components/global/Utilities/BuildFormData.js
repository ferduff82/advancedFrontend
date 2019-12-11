
import { store } from '../../../store/configStore';

 var BuildFormData = () => {

    let getStoreStatus = store.getState();
    let formData = new FormData;

    const { 
        tipoDeVehiculo, 
        numeroPlazas, 
        sillaDeRuedas,
        rampa,
        patente,
        vehiculo,
        celador } = getStoreStatus.professionalsData;

    const { registro, cv, seguro, cedula, vtv, tituloPropiedad, cesionDeUso, constanciaAfip, ingBrutos, pagoIngBrutos } = getStoreStatus.buildImages;

    let registroDocumentation = registro.data.file;
    let cvDocumentation = cv.data.file;
    let seguroDocumentation = seguro.data.file;
    let cedulaDocumentation = cedula.data.file;
    let vtvDocumentation = vtv.data.file;
    let tituloPropiedadDocumentation = tituloPropiedad.data.file;
    let cesionUsoDocumentation = cesionDeUso.data.file;
    let constanciaAfipDocumentation = constanciaAfip.data.file;
    let ingBrutosDocumentation = ingBrutos.data.file;
    let pagoIngBrutosDocumentation = pagoIngBrutos.data.file;

    /* Temporary harcoded value */
    formData.set('serviceData', 'REMIS');
    /* End of temporary harcoded value */

    /* This data will be sent only if "serviceData" === "REMIS" */
    formData.set('vehicleType', tipoDeVehiculo);
    formData.set('numeroPlazas', numeroPlazas);
    formData.set('sillaDeRuedas', sillaDeRuedas);
    formData.append('rampa', rampa);
    formData.append('patente', patente);
    formData.append('vehiculo', vehiculo);
    formData.append('celador', celador.activate);
    /* This data will be sent only if "serviceData" === "REMIS" */

    /* Push images if is an Object and if the value is not empty*/

    if(isEmpty(registroDocumentation) && typeof registroDocumentation === 'object') {
        formData.set('registro', registroDocumentation);
    }
    if(isEmpty(cvDocumentation) && typeof cvDocumentation === 'object') {
        formData.set('cv', cvDocumentation);
    }
    if(isEmpty(seguroDocumentation) && typeof seguroDocumentation === 'object') {
        formData.set('seguro', seguroDocumentation);
    }
    if(isEmpty(cedulaDocumentation) && typeof cedulaDocumentation === 'object') {
        formData.set('cedula', cedulaDocumentation);
    }
    if(isEmpty(vtvDocumentation) && typeof vtvDocumentation === 'object') {
        formData.set('vtv', vtvDocumentation);
    }
    if(isEmpty(tituloPropiedadDocumentation) && typeof tituloPropiedadDocumentation === 'object') {
        formData.set('tituloPropiedad', tituloPropiedadDocumentation);
    }
    if(isEmpty(cesionUsoDocumentation) && typeof cesionUsoDocumentation === 'object') {
        formData.set('cesionDeUso', cesionUsoDocumentation);
    }
    if(isEmpty(constanciaAfipDocumentation) && typeof constanciaAfipDocumentation === 'object') {
        formData.set('constanciaAfip', constanciaAfipDocumentation);
    }
    if(isEmpty(ingBrutosDocumentation) && typeof ingBrutosDocumentation === 'object') {
        formData.set('ingresosBrutos', ingBrutosDocumentation);
    }
    if(isEmpty(pagoIngBrutosDocumentation) && typeof pagoIngBrutosDocumentation === 'object') {
        formData.set('pagoIngresosBrutos', pagoIngBrutosDocumentation);
    }

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    return formData;
}

export default BuildFormData;