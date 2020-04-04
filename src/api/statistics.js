const axios = require("axios");
const dotenv = require("dotenv");

const { COVID_DATA_API } = require("../settings");

dotenv.config();

const getTotalCases = async () =>
  await axios
    .get(`${COVID_DATA_API}/worldstat.php`, {
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": process.env.COVID_API_TOKEN,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

const getTotalCasesByCountry = async (country) => {
  if (!country) {
    return null;
  }

  return await axios
    .get(`${COVID_DATA_API}/latest_stat_by_country.php?country=${country}`, {
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": process.env.COVID_API_TOKEN,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
};

module.exports = {
  getTotalCases,
  getTotalCasesByCountry,
};
