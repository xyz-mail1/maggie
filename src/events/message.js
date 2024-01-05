const {
  Collection,
  Events,
  EmbedBuilder,
  WebhookClient,
  codeBlock,
} = require("discord.js");

var PrettyError = require("pretty-error");
var pe = new PrettyError();

module.exports = {
  name: Events.MessageCreate,
  execute: async (message) => {
    const errors = new WebhookClient({ url: process.env.webhook });
    let client = message.client;
    if (message.author === client) return;
    const ping = `<@${client.user.id}>`;
    const prefixes = ["sm", "!", "shivie", "maggie", "love", ping];

    if (message.author.bot) return;

    const lowercasedMessage = message.content.toLowerCase();
    const prefixUsed = prefixes.find((prefix) =>
      lowercasedMessage.startsWith(prefix.toLowerCase()),
    );

    if (!prefixUsed) return;

    const strippedMessage = lowercasedMessage.slice(prefixUsed.length);

    const args = strippedMessage.trim().split(" ");

    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName),
      );

    if (!command) return;

    const whitelist = [
      "911822497891102741",
      "901366487850303499",
      "1107228788569423965",
      "1124643555948900433",
    ];
    // check for commands that only shiv and maggie can use
    // 
    if (command.SnM) {
      if (!whitelist.includes(message.author.id)) return;
    }

    // checks for guild only commands
    //
    if (command.guildOnly && message.channel.type === "dm") {
      return message.reply("I can't execute that command inside DMs!");
    }



    // check if args are required
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
      }
      return message.channel.send(reply);
    }
    // cooldown
    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message
          .reply(
            `please wait ${timeLeft.toFixed(
              1,
            )} more second(s) before reusing the \`${command.name}\` command.`,
          )
          .then((reply) => {
            message.delete({ timeout: timeLeft });
            reply.delete({ timeout: timeLeft });
          });
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.run(client, message, args);
    } catch (error) {
      console.log(error);
    }
  },
};
