import Axios from 'axios';

var PostLocation = function(cuil, position) {
	Axios({
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		url: 'https://gps-dot-uma-v2.appspot.com/v1/users/'+ cuil +'/location',
		data: {
			lat: position.latitude,
			lon: position.longitude,
			time: + new Date()
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
