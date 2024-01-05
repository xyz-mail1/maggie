const getColors = require("get-image-colors");

module.exports = (client) => {
  client.getRandomColor = async (link) => {
    return new Promise((resolve, reject) => {
      getColors(link, function(err, colors) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const colorArray = colors.map((c) => c.hex());
          const randomColor =
            colorArray[Math.floor(Math.random() * colorArray.length)];
          resolve(randomColor);
        }
      });
    });
  };
};
