const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "poke",
  cooldown: 3,
  SnM: false,
  run: async (client, message, args) => {
    const sender = message.author.id;
    const mention = message.mentions.users.first() || message.author;
    const target = mention.id;
    const gif = await api.sfw("poke");
    if (!gif) return;
    if (target) {
      client.incrementCount("pokes", sender, target);
      const count = await client.getCount("pokes", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(`${message.author} pokes ${mention}`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `poke count: 1` });
      } else {
        embed.setFooter({ text: `poke count: ${count}` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
