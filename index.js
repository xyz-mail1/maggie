require("dotenv").config();
require("better-module-alias")(__dirname, {
  $purr: "./wrapper/",
});
const token = process.env.token,
  BotClient = require(`./src/helpers/bot`),
  client = new BotClient();
const { REST, Routes } = require("discord.js");
const clientId = process.env.clientid;
const guild = process.env.guild;
const { readdirSync } = require("fs");
const path = require("path");
client.loadHandlers();

const rest = new REST().setToken(token);
/*const commands = [];
readdirSync("./src/slash/").map(async (dir) => {
  readdirSync(`./src/slash/${dir}`).map(async (cmd) => {
    commands.push(require(path.join(__dirname, `./src/slash/${dir}/${cmd}`)));
  });
});*/
/*
rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);*/

process.on("unhandledRejection", (err) =>
  console.log(`Unhandled exception`, err),
);
process.on("uncaughtException", (err) =>
  console.log(`Uncaught Exception`, err),
);

client.login(token);
