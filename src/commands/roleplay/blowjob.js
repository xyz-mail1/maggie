const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "blowjob",
  aliases: ["bj"],
  cooldown: 3,
  SnM: false,
  run: async (client, message, args) => {
    const sender = message.author.id;
    const mention = message.mentions.users.first() || message.author;
    const target = mention.id;
    const gif = await api.nsfw("blowjob");
    if (!gif) return;
    if (target) {
      client.incrementCount("blowjobs", sender, target);
      const count = await client.getCount("blowjobs", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor("Random")

        .setDescription(`${message.author} gives ${mention} a blowjob`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `blowjob count: 1` });
      } else {
        embed.setFooter({ text: `blowjob count: ${count}` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
