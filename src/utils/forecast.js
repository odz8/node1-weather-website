const request = require("request");
const weatherCode = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=aed92e25ff46bed89e5ada14b4afcbae&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("Wrong coordinates. Please try again.", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = weatherCode;
