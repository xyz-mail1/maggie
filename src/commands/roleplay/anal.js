const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "anal",
  cooldown: 3,
  SnM: true,
  run: async (client, message, args) => {
    const sender = message.author.id;
    const mention = message.mentions.users.first() || message.author;
    const target = mention.id;
    const gif = await api.nsfw("anal");
    if (!gif) return message.reply("Error finding gif");
    if (target) {
      client.incrementCount("anal", sender, target);
      const count = await client.getCount("anal", sender, target);

      const embed = new Discord.EmbedBuilder()
        .setColor("#ffb3b3")

        .setDescription(`${message.author} fucks ${mention} a blowjob`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `It's their first backshot from you!` });
      } else {
        embed.setFooter({ text: `That's a total of ${count} backshots now!` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
