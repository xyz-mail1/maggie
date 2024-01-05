const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description: "pong",
  run: async (client, interaction) => {
    await interaction.reply({
      content: "Pong! " + client.ws.ping,
    });
  },
};
