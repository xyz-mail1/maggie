const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "hug",
  cooldown: 3,
  SnM: false,
  run: async (client, message, args) => {
    const sender = message.author.id;
    const mention = message.mentions.users.first() || message.author;
    const target = mention.id;
    const gif = await api.sfw("hug");
    if (!gif) return;
    if (target) {
      client.incrementCount("hugs", sender, target);
      const count = await client.getCount("hugs", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(`${message.author} hugs ${mention}`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `hug count: 1` });
      } else {
        embed.setFooter({ text: `hug count: ${count}` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
