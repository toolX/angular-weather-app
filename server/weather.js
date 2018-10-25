const axios = require('axios');

const weatherApiUrl = 'https://api.darksky.net/forecast';
const weatherApiKey = 'f9be679bf70c817b44bbcc681de0d455';

const getWeather = async (userConfig) => {
  const finalUrl = `${weatherApiUrl}/${weatherApiKey}/${userConfig.lat},${userConfig.lng}`;
  
  try {
    const response = await axios.get(finalUrl);

    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;

    return `Temperature is ${temperature} but it feels like ${apparentTemperature}`;
  } catch (e) {
    throw new Error(`Unable to get weather for ${userConfig.lat}, ${userConfig.lng}.`);
  }
}

module.exports.getWeather = getWeather;
