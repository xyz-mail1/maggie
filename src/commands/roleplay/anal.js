const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "anal",
  cooldown: 3,
  SnM: false,
  run: async (client, message, args) => {
    const sender = message.author.id;
    const mention = message.mentions.users.first() || message.author;
    const target = mention.id;
    const gif = await api.nsfw("anal");
    if (!gif) return message.reply(`error`);
    const a = await client.getRandomColor(gif.link);

    if (target) {
      client.incrementCount("anal", sender, target);
      const count = await client.getCount("anal", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor(a)

        .setDescription(`${message.author} fucks ${mention}`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `anal count: 1` });
      } else {
        embed.setFooter({ text: `anal count: ${count}` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
