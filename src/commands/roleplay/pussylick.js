const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "pussylick",
  aliases: ["pl"],
  cooldown: 3,
  SnM: false,
  run: async (client, message, args) => {
    const sender = message.author.id;
    const mention = message.mentions.users.first() || message.author;
    const target = mention.id;
    const gif = await api.nsfw("pussylick");
    if (!gif) return;
    if (target) {
      client.incrementCount("pussylicks", sender, target);
      const count = await client.getCount("pussylicks", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(`${message.author} licks ${mention}`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `lick count: 1` });
      } else {
        embed.setFooter({ text: `lick count: ${count}` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
