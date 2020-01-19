import firebase from "../../config/DBConnection"

const firestore = firebase.firestore();
var previousOpen = null;

export function openDropdown(dataOpen) {
  return {
    type: 'OPEN_DROPDOWN',
    payload: dataOpen
  }
}

export function displayModal(value) {
  return {
    type: 'TOGGLE_MODAL',
    payload: value
  }
}

export function openMap(mapOpen, dataTrip) {
  return {
    type: 'OPEN_MAP',
    payload: {
      open: mapOpen,
      dataTrip: dataTrip
    }
  }
}

export function toggleDropdown(dataOpen) {
  if (dataOpen !== previousOpen) {
    previousOpen = dataOpen;
  } else {
    previousOpen = null;
  }
  return {
    type: 'TOGGLE_DROPDOWN',
    payload: previousOpen
  }
}

export function triggerLoadingTrip(loadingTrip) {
  return {
    type: 'TRIGGER_LOADING_TRIP',
    payload: loadingTrip
  }
}

export async function getUser() {
  const email = firebase.auth().currentUser.email
  // As the email is created by concat phone + @uma-health.com, use slice to get the phone
  const tel = email.slice(0, 13)
  const data = await firestore.collection('providers').where("ws", "==", tel).get()
    .then(doc => {
      let userData = []
      doc.forEach(item => userData.push(item.data()))
      return userData[0]
    })
    .catch(e => console.log("No se consiguió al usuario: " + tel + " err: " + e))
  return data;
}