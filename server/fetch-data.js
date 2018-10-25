const { getUserLocation } = require('./location');
const { getWeather } = require('./weather');

const fetchData = async (userConfig) => {
  const userLocation = await getUserLocation(userConfig);

  const weatherData = await getWeather(userLocation);

  return weatherData;
};

module.exports.fetchData = fetchData;
