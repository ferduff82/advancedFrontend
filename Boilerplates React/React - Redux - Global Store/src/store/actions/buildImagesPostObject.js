
export const HANDLE_POST_DNI = 'BUILD_POST_DNI';
export const HANDLE_POST_CV = 'BUILD_POST_CV';
export const HANDLE_POST_TITULO = 'BUILD_POST_TITULO';
export const HANDLE_POST_SEGURO = 'BUILD_POST_SEGURO';
export const HANDLE_POST_AFIP = 'BUILD_POST_AFIP';
export const HANDLE_POST_CELADOR = 'BUILD_POST_CELADOR';

export function buildPostDni(eventData) {
  return {
    type: HANDLE_POST_DNI,
    payload: eventData
  }
}

export function buildPostCv(eventData) {

  var file = eventData;
  var dataImg = '';

  if (typeof eventData === 'string') {
    dataImg = eventData;
  } else {
    var filePreview = URL.createObjectURL(eventData);
    dataImg = filePreview;
  }

  return {
    type: HANDLE_POST_CV,
    payload: {
      filePreview: dataImg,
      cv: file
    }
  }
}

export function buildPostTitulo(eventData) {

  var file = eventData;
  var dataImg = '';

  if (typeof eventData === 'string') {
    dataImg = eventData;
  } else {
    var filePreview = URL.createObjectURL(eventData);
    dataImg = filePreview;
  }

  return {
    type: HANDLE_POST_TITULO,
    payload: {
      filePreview: dataImg,
      titulo: file
    }
  }
}

export function buildPostSeguro(eventData) {

  var file = eventData;
  var dataImg = '';

  if (typeof eventData === 'string') {
    dataImg = eventData;
  } else {
    var filePreview = URL.createObjectURL(eventData);
    dataImg = filePreview;
  }

  return {
    type: HANDLE_POST_SEGURO,
    payload: {
      filePreview: dataImg,
      seguro: file
    }
  }
}

export function buildPostAfip(eventData) {

  var file = eventData;
  var dataImg = '';

  if (typeof eventData === 'string') {
    dataImg = eventData;
  } else {
    var filePreview = URL.createObjectURL(eventData);
    dataImg = filePreview;
  }

  return {
    type: HANDLE_POST_AFIP,
    payload: {
      filePreview: dataImg,
      afip: file
    }
  }
}

export function buildPostCelador(eventData) {

  var file = eventData;
  var dataImg = '';

  if (typeof eventData === 'string') {
    dataImg = eventData;
  } else {
    var filePreview = URL.createObjectURL(eventData);
    dataImg = filePreview;
  }

  return {
    type: HANDLE_POST_CELADOR,
    payload: {
      filePreview: dataImg,
      celador: file
    }
  }
}
