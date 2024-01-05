const getColors = require("get-image-colors");

module.exports = (client) => {
  client.getColor = async (link) => {
    return new Promise((resolve, reject) => {
      getColors(link, function(err, colors) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const colorArray = colors.map((c) => c.hex());
          const getRandomColor = function() {
            return colorArray[Math.floor(Math.random() * colorArray.length)];
          };
          client.getRandomColor = getRandomColor;

          resolve(colorArray);
        }
      });
    });
  };
  return new Promise((resolve) => {
    resolve();
  });
};
