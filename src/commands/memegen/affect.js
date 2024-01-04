const c = require("canvacord");
const { AttachmentBuilder } = require("discord.js");

module.exports = {
  name: "affect",
  run: async (client, message, args) => {
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    let image = await c.canvacord.affect(avatar);
    await message.reply(new AttachmentBuilder(image, "maggie.png"));
  },
};
