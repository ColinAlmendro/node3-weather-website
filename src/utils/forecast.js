const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=cea3f7499bed7c444e41d52d3845ae85&query=${latitude},${longitude}&units=m`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather service", undefined);
		} else if (body.error) {
			callback("Unable to find location for these co-ordinates", undefined);
		} else {
			const current = body.current;
			const currTemp = current.temperature;
			const feelsLikeTemp = current.feelslike;

			callback(undefined, {
				currTemp: currTemp,
				feelsLikeTemp: feelsLikeTemp,
			});
		}
	});
};

module.exports = forecast;
