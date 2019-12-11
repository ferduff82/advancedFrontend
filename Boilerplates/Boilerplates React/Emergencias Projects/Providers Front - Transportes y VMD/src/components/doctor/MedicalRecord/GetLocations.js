
var GetLocations = function (options) {
	if (navigator.geolocation) {
		return new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(resolve, reject, options);
		});
	} else {
		return new Promise(
			resolve => resolve({
				message: 'Your browser does not support Geolocation'
			})
		)
	}
}

export default GetLocations;
