const fs = require("fs");
const { REST, Routes } = require("discord.js");
module.exports = (client) => {
  const folders = fs.readdirSync(`./src/slash/`);
  try {
    const commands = [];
    for (const folder of folders) {
      const files = fs.readdirSync(`./src/slash/${folder}`);
      for (const file of files) {
        const command = require(`../slash/${folder}/${file}`);

        client.slash.set(command.name, command);
        commands.push(command);

        client.logger.log(
          `${folder.toUpperCase()} loaded with ${files.length} (/) commands`,
        );
      }
    }
    const rest = new REST().setToken(process.env.token);
    (async () => {
      client.logger.log(
        `Started refreshing ${commands.length} application (/) commands.`,
      );

      const data = await rest.put(
        Routes.applicationCommands(process.env.clientid),
        {
          body: commands,
        },
      );
      client.logger.log(
        `Successfully reloaded ${data.length} application (/) commands.`,
      );
    })();
  } catch (error) {
    client.logger.error(`Error in slash command handler: \n${error}`);
  }
};
