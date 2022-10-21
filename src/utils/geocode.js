const request = require("postman-request");

const geocode = (address, callback) => {
	const url = `http://api.positionstack.com/v1/forward?access_key=1ab647328e89b83967f1c50ff11facbd&query=${encodeURIComponent(
		address
	)}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to location services", undefined);
		} else if (body.error) {
			callback("Unable to find location", undefined);
		} else {
			//console.log(body.data[0]);
			const longitude = body.data[0].longitude;
			const latitude = body.data[0].latitude;
			const location = body.data[0].label;

			callback(undefined, {
				longitude,
				latitude,
				location,
			});
		}
	});
};

module.exports = geocode;
