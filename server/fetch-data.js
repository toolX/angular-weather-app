const { getUserLocation } = require('./location');
const { getWeather } = require('./weather');

const fetchData = async (userConfig) => {
  const userLocation = await getUserLocation(userConfig);

  const weatherData = await getWeather(userLocation, userConfig);

  return weatherData;
};

module.exports.fetchData = fetchData;
