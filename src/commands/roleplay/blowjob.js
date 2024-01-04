const Discord = require("discord.js");

const PurrBot = require("$purr/purr");
const api = new PurrBot();
module.exports = {
  name: "blowjob",
  aliases: ["bj"],
  cooldown: 3,
  SnM: true,
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
        .setColor("#ffb3b3")
        .setTitle("You gave a blowjob!")
        .setDescription(`${message.author} gives ${mention} a blowjob`)
        .setImage(gif.link);
      if (count === 1) {
        embed.setFooter({ text: `It's their first blowjob from you!` });
      } else {
        embed.setFooter({ text: `That's a total of ${count} blowjobs now!` });
      }
      await message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
