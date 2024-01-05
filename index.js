require("dotenv").config();
require("better-module-alias")(__dirname, {
  $purr: "./wrapper/",
});

const token = process.env.token,
  BotClient = require(`./src/helpers/bot`),
  client = new BotClient();

client.loadHandlers();
const test = client.getColor(
  "https://purrbot.site/img/sfw/cuddle/gif/cuddle_038.gif",
);

console.log(test);

process.on("unhandledRejection", (err) =>
  console.log(`Unhandled exception\n`, err),
);
process.on("uncaughtException", (err) =>
  console.log(`Uncaught Exception\n`, err),
);

client.login(token);
