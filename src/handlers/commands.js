const fs = require("fs");

module.exports = (client) => {
  let total = 0; // all commands loaded
  const commandFolders = fs.readdirSync("./src/commands");

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(`./src/commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    let individual = 0; // commands loaded from foldeds
    for (const file of commandFiles) {
      try {
        const command = require(`../commands/${folder}/${file}`);

        // Check if the command name already exists
        if (client.commands.has(command.name)) {
          client.logger.warn(`Duplicate command name: ${command.name}`);
          continue; // Skip loading this command to avoid overwriting
        }

        client.commands.set(command.name, command);
        total++;
        individual++;
      } catch (err) {
        client.logger.error(`Failed to load ${file}. Reason: ${err.message}`);
      }
    }
    client.logger.log(`Loaded ${individual} commands from ${folder}`);
  }

  client.logger.log(`Loaded total ${total} commands`);
};
