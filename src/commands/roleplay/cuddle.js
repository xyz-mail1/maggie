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
    const test = await client.gifColor(gif.link);
    console.log(test.color);

    if (target) {
      client.incrementCount("cuddles", sender, target);
      const count = await client.getCount("cuddles", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(`${message.author} cuddles ${mention}`)
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
