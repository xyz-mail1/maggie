const { Connect4 } = require("discord-gamecord");

module.exports = {
  name: "connect4",
  aliases: "c4",
  run: async (client, message, args) => {
    const Game = new Connect4({
      message: message,
      isSlashGame: false,
      opponent: message.mentions.users.first(),
      embed: {
        title: "Connect4 Game",
        statusTitle: "Status",
        color: "#FF0",
      },
      emojis: {
        board: "⚪",
        player1: "🔴",
        player2: "🟡",
      },
      mentionUser: true,
      timeoutTime: 60000,
      buttonStyle: "PRIMARY",
      turnMessage: `{emoji} | Its **{player}**'s turn.`,
      winMessage: "{emoji} | **{player}** won the Connect4 Game.",
      tieMessage: "The Game tied! No one won the Game!",
      timeoutMessage: "The Game went unfinished! No one won the Game!",
      playerOnlyMessage: "Only {player} and {opponent} can use these buttons.",
    });
    Game.startGame();
    Game.on("gameOver", (result) => {
      console.log(result); // =>  { result... }
    });
  },
};
