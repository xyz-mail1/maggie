const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "fuck",
  aliases: ["sex", "bang", "rape"],
  cooldown: 3,
  SnM: false,
  run: async (client, message, args) => {
    const sender = message.author.id;
    const mention = message.mentions.users.first() || message.author;
    const target = mention.id;
    const gif = await api.nsfw("fuck");
    if (!gif) return;
    if (target) {
      client.incrementCount("fucks", sender, target);
      const count = await client.getCount("fucks", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(`${message.author} fucks ${mention}`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `fuck count: 1` });
      } else {
        embed.setFooter({ text: `fuck count: ${count}` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
