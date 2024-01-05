const {
  Client,
  GatewayIntentBits: GB,
  Partials,
  Collection,
} = require("discord.js"),
  fs = require("node:fs"),
  Logger = require(`./logger`);
const getColors = require("get-image-colors");
module.exports = class BotClient extends Client {
  constructor() {
    super({
      intents: [
        GB.AutoModerationConfiguration,
        GB.AutoModerationExecution,
        GB.DirectMessageReactions,
        GB.DirectMessageTyping,
        GB.DirectMessages,
        GB.GuildEmojisAndStickers,
        GB.GuildIntegrations,
        GB.GuildInvites,
        GB.GuildMembers,
        GB.GuildMessageReactions,
        GB.GuildMessageTyping,
        GB.GuildMessages,
        GB.GuildModeration,
        GB.GuildPresences,
        GB.GuildScheduledEvents,
        GB.GuildVoiceStates,
        GB.GuildWebhooks,
        GB.Guilds,
        GB.MessageContent,
      ],
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember,
      ],
      shards: "auto",
    });

    this.wait = require("util").promisify(setTimeout);
    this.logger = Logger;

    this.commands = new Collection();
    0;
    this.slash = new Collection();
    this.cooldowns = new Collection();
  }
  gifColor(link) {
    let arr = [];
    getColors(link, function(err, colors) {
      if (err) this.logger.error(err);
      arr = colors.map((c) => c.hex());
    });
    this.color = function() {
      return arr[Math.floor(Math.random() * arr.length)];
    };
  }

  loadHandlers() {
    const handlers = fs.readdirSync("./src/handlers");

    for (const file of handlers) {
      require(`../handlers/${file}`)(this);
    }
  }
};
