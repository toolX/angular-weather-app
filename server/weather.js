const axios = require('axios');

const weatherApiUrl = 'https://api.darksky.net/forecast';
const weatherApiKey = 'f9be679bf70c817b44bbcc681de0d455';

const getWeather = async (userLocation, userConfig) => {
  const finalUrl = `${weatherApiUrl}/${weatherApiKey}/${userLocation.lat},${userLocation.lng}?exclude=minutely,hourly,daily,alerts,flags&lang=${userConfig.userLanguage}&units=${userConfig.userMetricSystem}`;
  
  try {
    const response = await axios.get(finalUrl);

    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    const summary = response.data.currently.summary;

    return response.data.currently;

    /* return `Temperature is ${temperature} but it feels like ${apparentTemperature}. ${summary}`; */
  } catch (e) {
    throw new Error(`Unable to get weather for ${userLocation.lat}, ${userLocation.lng}.`);
  }
}

module.exports.getWeather = getWeather;
