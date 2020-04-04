const axios = require("axios");
const dotenv = require("dotenv");

const { COVID_DATA_API, TELEGRAM_BOT_URL } = require("../settings");
const { GET_TOTAL, GET_TOTAL_BY_COUNTRY } = require("../commands");

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

const getTotalCasesByCountry = async (country) =>
  await axios
    .get(`${COVID_DATA_API}/latest_stat_by_country.php?country=${country}`, {
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": process.env.COVID_API_TOKEN,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

const executeCommand = async (command, params) => {
  switch (command) {
    case GET_TOTAL:
      return await getTotalCases();
    case GET_TOTAL_BY_COUNTRY:
      return await getTotalCasesByCountry(params[0]);
  }
};

const sendMessage = async (req, res) => {
  const message = req.body.message || req.body.edited_message;

  if (message) {
    const chatId = message.chat.id;
    const [command, ...params] = message.text.split(" ");
    const commandResult = await executeCommand(command, params);

    await axios
      .post(
        `${TELEGRAM_BOT_URL}${process.env.TELEGRAM_API_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: commandResult,
        }
      )
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.send(error);
      });
  }
};

module.exports = {
  sendMessage,
};
