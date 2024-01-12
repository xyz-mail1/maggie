const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "kiss",
  cooldown: 3,
  SnM: false,
  run: async (client, message, args) => {
    const sender = message.author.id;
    const mention = message.mentions.users.first() || message.author;
    const target = mention.id;
    const gif = await api.sfw("kiss");
    if (!gif) return;
    if (target) {
      client.incrementCount("kisses", sender, target);
      const count = await client.getCount("kisses", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(`${message.author} kisses ${mention}`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `kiss count: 1` });
      } else {
        embed.setFooter({ text: `kiss count: ${count}` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
