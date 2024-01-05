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

/*(async () => {
  const test = await client.getColor(
    "https://purrbot.site/img/sfw/cuddle/gif/cuddle_038.gif",
  );

  const a = client.getRandomColor();
  console.log(a);
})();*/
process.on("unhandledRejection", (err) => console.log(pe.render(err)));
process.on("uncaughtException", (err) => console.log(pe.render(err)));

client.login(token);
