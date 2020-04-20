// weatherstack api key: 58eda886b1b01555ca763a7698831ab9

const request = require("request");

const url =
  "http://api.weatherstack.com/current?access_key=58eda886b1b01555ca763a7698831ab9&query=37.8267,-122.4233&units=f";

request({ url: url, json: true }, (error, response) => {
  // const data = JSON.parse(response.body); We don't need this anymore since we added json to the options.
  if (error) {
    console.log("Unable to connect to weather service!");
  } else if (response.body.error) {
    console.log(response.body.error.info);
  } else {
    const data = response.body.current;
    console.log(
      `${data.weather_descriptions[0]}. It's currently ${data.temperature} degrees, feels like ${data.feelslike}`
    );
  }
});

const mapboxToken =
  "pk.eyJ1IjoiZG9uYWRvbnppIiwiYSI6ImNrOTducXJhbDBkcGIzbWxlNWx5cHM4b3YifQ.E74o4qlSnxTxGApL22LUsw";
const city = "khar12";
request(
  {
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${mapboxToken}&limit=1`,
    json: true,
  },
  (err, response) => {
    if (err) {
      console.log("Unable to connect to map service!");
    } else if (response.body.features.length === 0) {
      console.log("Unable to find the location.");
    } else {
      const data = response.body;
      console.log(
        `The latitude of ${city} is ${data.features[0].center[1]} and its longitude is ${data.features[0].center[0]}`
      );
    }
  }
);
