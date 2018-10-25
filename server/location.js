const axios = require('axios');

const geoJsonApiUrl = 'http://www.mapquestapi.com/geocoding/v1/address?';
const geoJsonApiKey = 'mRaWZx5GGcCd1BMQTtRHQpmkYaq1eIBs';

const getUserLocation = async (userConfig) => {
  /* TODO:
  Check user input
   */
  const encodedUserInput = encodeURIComponent(userConfig.userLocation);
  const finalUrl = `${geoJsonApiUrl}key=${geoJsonApiKey}&location=${encodedUserInput}`;
  
  try {
    const response = await axios.get(finalUrl);

    const userLatLng = {};
    userLatLng.lat = response.data.results[0].locations[0].latLng.lat;
    userLatLng.lng = response.data.results[0].locations[0].latLng.lng;

    return userLatLng;
  } catch (e) {
    throw new Error(`Unable to get location for ${encodedUserInput}.`);
  }
};

module.exports.getUserLocation = getUserLocation;
