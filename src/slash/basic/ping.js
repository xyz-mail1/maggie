const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  run: async (client, interaction) => {
    await interaction.reply({
      content: "Pong! " + client.ws.ping,
    });
  },
};
