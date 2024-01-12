const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "bite",
  aliases: ["eat", "nom"],
  cooldown: 3,
  SnM: false,
  run: async (client, message, args) => {
    const sender = message.author.id;
    const mention = message.mentions.users.first() || message.author;
    const target = mention.id;
    const gif = await api.sfw("bite");
    if (!gif) return;
    if (target) {
      client.incrementCount("bites", sender, target);
      const count = await client.getCount("bites", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(`${message.author} bites ${mention}`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `bite count: 1` });
      } else {
        embed.setFooter({ text: `bite count: ${count}` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
