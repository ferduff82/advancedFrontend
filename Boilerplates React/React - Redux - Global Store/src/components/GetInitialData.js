
import Axios from 'axios';

var GetInitialData = function(res, position) {
	var cuit = res.mr.provider.cuit;
	Axios({
		url: 'https://gps-dot-uma-v2.appspot.com/v1/users/'+ cuit +'/location',
	})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});
}

export default GetInitialData;
