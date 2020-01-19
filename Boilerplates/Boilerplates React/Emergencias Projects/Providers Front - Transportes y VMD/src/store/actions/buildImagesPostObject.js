
export function buildUploadImages(eventData, type) {

  var HANDLE_TYPE = '';
  var dataImg = '';
  var dataFileName = '';

  if (typeof eventData === 'string') {
    dataImg = eventData;
  } else {
    var filePreview = URL.createObjectURL(eventData);
    dataImg = filePreview;
  }

  if (type === 'insurance') {
    HANDLE_TYPE = 'BUILD_POST_SEGURO';
    dataFileName = "seguro";
  } else if (type === 'afip') {
    HANDLE_TYPE = 'BUILD_POST_AFIP';
    dataFileName = "afip";
  } else if (type === 'cv') {
    HANDLE_TYPE = 'BUILD_POST_CV';
    dataFileName = "cv";
  } else if (type === 'title') {
    HANDLE_TYPE = 'BUILD_POST_TITULO';
    dataFileName = "titulo";
  } else if (type === 'matricula') {
    HANDLE_TYPE = 'BUILD_POST_MATRICULA';
    dataFileName = "matricula";
  } else if (type === 'especialidad') {
    HANDLE_TYPE = 'BUILD_POST_ESPECIALIDAD';
    dataFileName = "especialidad";
  } else if (type === 'certificado') {
    HANDLE_TYPE = 'BUILD_POST_CERTIFICADO';
    dataFileName = "certificado";
  } else if (type === 'airport') {
    HANDLE_TYPE = 'BUILD_POST_AEROPUERTO';
    dataFileName = "aeropuerto";
  }

  return {
    type: HANDLE_TYPE,
    payload: {
      filePreview: dataImg,
      [dataFileName]: eventData
    }
  }
}
