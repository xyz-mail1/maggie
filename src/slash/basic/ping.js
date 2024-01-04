const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("test"),
  run: async (client, interaction) => {
    await interaction.reply({
      content: "Pong! " + client.ws.ping,
    });
  },
};
