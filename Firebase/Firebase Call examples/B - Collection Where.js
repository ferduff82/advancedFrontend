
import DBConnection from '../../config/DBConnection';

useEffect(() => {
	const firestore = DBConnection.firestore()
	if(salatoken.sala === "" || salatoken.token === "") {
	  	try {
		    let queryUser = firestore.collection('auth').where("dni", "==", user.dni) // hardoded
		    queryUser.onSnapshot(async function(querySnapshot) {
		        await querySnapshot.forEach((each) => {
		            let data = each.data()._start_date.split('///')
		            console.log({room: data[0], token: data[1]})
		            dispatch({type: 'SET_CALL_ROOM', payload: {room: data[0], token: data[1]}})
		        })
		    })
		}
		catch (err) {
			  console.error("FAILED QueryUser")
		}
}
