// weatherstack api key: 58eda886b1b01555ca763a7698831ab9

const request = require("request");

const url =
  "http://api.weatherstack.com/current?access_key=58eda886b1b01555ca763a7698831ab9&query=37.8267,-122.4233";

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data.current);
});
