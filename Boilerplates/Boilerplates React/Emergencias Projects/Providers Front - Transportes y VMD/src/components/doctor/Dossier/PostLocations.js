
import Axios from 'axios';

var PostLocation = function(res, position) {
	var cuit = res.mr.provider.cuit;
	Axios({
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		url: 'https://gps-dot-uma-v2.appspot.com/v1/users/'+ cuit +'/location',
		data: {
			lat: position.coords.latitude,
			lon: position.coords.longitude,
			time: position.timestamp
		}
	})
	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});
}

export default PostLocation;
