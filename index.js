require("dotenv").config();
require("better-module-alias")(__dirname, {
  $purr: "./wrapper/",
});
var PrettyError = require("pretty-error");
var pe = new PrettyError();

const token = process.env.token,
  BotClient = require(`./src/helpers/bot`),
  client = new BotClient();

client.loadHandlers();
const { WebhookClient, EmbedBuilder } = require("discord.js");
const webhook = new WebhookClient({ url: process.env.webhook });
/*(async () => {
  const test = await client.getColor(
    "https://purrbot.site/img/sfw/cuddle/gif/cuddle_038.gif",
  );

  const a = client.getRandomColor();
  console.log(a);
})();*/
process.on("unhandledRejection", (error) => {
  if (error.length > 900) {
    error = error.slice(0, 900) + "...";
  }
  if (error.stack) {
    if (error.stack.length > 900)
      error.stack = error.stack.slice(0, 900) + "...";
  }
  const embed = new EmbedBuilder().addFields([
    {
      name: "Error",
      value: error ? error : "No error",
    },
    {
      name: "Stack",
      value: error.stack ? error.stack : "No stack",
    },
  ]);
  webhook.send({ embeds: [embed] });
  console.log(error);
});
process.on("uncaughtException", (err) => {
  console.log("test");
  console.log(pe.render(err));
});

client.login(token);
