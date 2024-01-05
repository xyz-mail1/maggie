const getColors = require("get-image-colors");

module.exports = (client) => {
  client.getColor = async (link) => {
    let arr = [];
    getColors(link, function (err, colors) {
      if (err) client.logger.error(err);
      arr = colors.map((c) => c.hex());
    });
    this.color = function () {
      return arr[Math.floor(Math.random() * arr.length)];
    };
  };
};
