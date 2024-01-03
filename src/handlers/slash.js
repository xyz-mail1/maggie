const fs = require("fs");

module.exports = (client) => {
  const folders = fs.readdirSync(`./src/slash`);
  for (const folder of folders) {
    const files = fs.readdirSync(`./src/slash/${folder}`);
    for (const file of files) {
      const command = require(`../slash/${folder}/${file}`);
      client.slash.set(command.name, command);
    }
  }
};
