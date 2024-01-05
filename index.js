require("dotenv").config();
require("better-module-alias")(__dirname, {
  $purr: "./wrapper/",
});
const { gifColor } = require(`./src/helpers/bot`);
const token = process.env.token,
  BotClient = require(`./src/helpers/bot`),
  client = new BotClient();

client.loadHandlers();
const test = client.gifColor(
  "https://purrbot.site/img/sfw/cuddle/gif/cuddle_038.gif",
);
const test2 = test.color();
console.log(test);
console.log(test2);

process.on("unhandledRejection", (err) =>
  console.log(`Unhandled exception\n`, err),
);
process.on("uncaughtException", (err) =>
  console.log(`Uncaught Exception\n`, err),
);

client.login(token);
