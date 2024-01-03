require("dotenv").config();
require("better-module-alias")(__dirname, {
  $purr: "./wrapper/",
});
const token = process.env.token,
  BotClient = require(`./src/helpers/bot`),
  client = new BotClient();

client.loadHandlers();

process.on("unhandledRejection", (err) =>
  console.log(`Unhandled exception`, err),
);
process.on("uncaughtException", (err) =>
  console.log(`Uncaught Exception`, err),
);

client.login(token);
