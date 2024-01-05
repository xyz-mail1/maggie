const fs = require("fs");

module.exports = (client) => {
  const commandFolders = fs.readdirSync("./src/commands");

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./src/commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      try {
        const command = require(`../commands/${folder}/${file}`);

        // Check if the command name already exists
        if (client.commands.has(command.name)) {
          client.logger.warn(`Duplicate command name: ${command.name}`);
          continue; // Skip loading this command to avoid overwriting
        }

        client.commands.set(command.name, command);
        client.logger.info(`Loaded command: ${command.name}`);
      } catch (err) {
        client.logger.error(`Failed to load ${file}. Reason: ${err.message}`);
      }
    }
  }
};
