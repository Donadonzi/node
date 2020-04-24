const request = require("request");
const mapboxToken =
	"pk.eyJ1IjoiZG9uYWRvbnppIiwiYSI6ImNrOTducXJhbDBkcGIzbWxlNWx5cHM4b3YifQ.E74o4qlSnxTxGApL22LUsw";


// The first version, before turning it into a reusable function.
// const city = "Toronto";
// request(
// 	{
// 		url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${mapboxToken}&limit=1`,
// 		json: true,
// 	},
// 	(err, response) => {
// 		if (err) {
// 			console.log("Unable to connect to map service!");
// 		} else if (response.body.features.length === 0) {
// 			console.log("Unable to find the location.");
// 		} else {
// 			const data = response.body;
// 			console.log(
// 				`The latitude of ${city} is ${data.features[0].center[1]} and its longitude is ${data.features[0].center[0]}`
// 			);
// 		}
// 	}
// );


const geocode = (city, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${mapboxToken}&limit=1`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to map service!', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find the location.', undefined);
		} else {
			callback(undefined, {
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				location: body.features[0].place_name
			})
		}
	});
}

module.exports = geocode;