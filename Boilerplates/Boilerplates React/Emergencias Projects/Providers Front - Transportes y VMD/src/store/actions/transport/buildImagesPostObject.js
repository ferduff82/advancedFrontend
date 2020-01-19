
export function buildUploadImages(eventData, dispatchType) {

  var file = eventData;
  var dataImg = '';

  if (typeof eventData === 'string') {
    dataImg = eventData;
  } else {
    var filePreview = URL.createObjectURL(eventData);
    dataImg = filePreview;
  }

  return {
    type: dispatchType,
    payload: {
      filePreview: dataImg,
      file: file
    }
  }
}
