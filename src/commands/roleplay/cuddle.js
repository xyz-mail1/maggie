const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "cuddle",
  cooldown: 3,
  SnM: false,
  run: async (client, message, args) => {
    const sender = message.author.id;
    const mention = message.mentions.users.first() || message.author;
    const target = mention.id;
    const gif = await api.sfw("cuddle");
    if (!gif) return;
    if (target) {
      client.incrementCount("cuddles", sender, target);
      const count = await client.getCount("cuddles", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor("#ffb3b3")
        .setDescription(`${message.author} bites ${mention}`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `cuddle count: 1` });
      } else {
        embed.setFooter({ text: `cuddle count: ${count}` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
