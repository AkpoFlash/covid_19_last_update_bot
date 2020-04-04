const axios = require("axios");
const dotenv = require("dotenv");

const { executeCommand } = require("../helpers");
const { TELEGRAM_BOT_URL } = require("../settings");

dotenv.config();

const sendMessage = async (req, res) => {
  const message = req.body.message || req.body.edited_message;

  if (message) {
    const chatId = message.chat.id;
    const [command, ...params] = message.text.split(" ");
    const commandResult = await executeCommand(command, params);

    if (commandResult) {
      await axios
        .post(
          `${TELEGRAM_BOT_URL}${process.env.TELEGRAM_API_TOKEN}/sendMessage`,
          {
            chat_id: chatId,
            text: commandResult,
            parse_mode: "HTML",
          }
        )
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((error) => {
          res.send(error);
        });
    }
  }
};

module.exports = {
  sendMessage,
};
