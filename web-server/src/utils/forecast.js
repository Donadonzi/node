const request = require('request');

var weatherstackKey = "58eda886b1b01555ca763a7698831ab9";


// This is the first version, before turning it to a reusable function.
// const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=37.8267,-122.4233`;

// request({ url: url, json: true }, (error, response) => {
// 	// const data = JSON.parse(response.body); We don't need this anymore since we added json to the options.
// 	if (error) {
// 		console.log("Unable to connect to weather service!");
// 	} else if (response.body.error) {
// 		console.log(response.body.error.info);
// 	} else {
// 		const data = response.body.current;
// 		console.log(
// 			`${data.weather_descriptions[0]}. It's currently ${data.temperature} degrees, feels like ${data.feelslike}`
// 		);
// 	}
// });


const forecast = (lat, long, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${lat},${long}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback(body.error.info, undefined);
		} else {
			const data = body.current;
			callback(undefined, `${data.weather_descriptions[0]}. It's currently ${data.temperature} degrees, feels like ${data.feelslike}`);
		}
	});
}

module.exports = forecast;

