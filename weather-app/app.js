const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const city = process.argv[2];

if (!city) {
	console.log('Please provide a city name.');
} else {
	geocode(city, (error, { latitude, longitude, location}) => {

		if (error) {
			return console.log(error);
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return console.log(error);
			}
			console.log(location);
			console.log(forecastData);
		});
	});
}




