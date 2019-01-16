const fs = require("fs");

const app = (req, res) => {
  try {
    fs.readFile("." + req.url, function(err, contents) {
      res.statusCode = 200;
      res.write(contents);
      res.end();
      if (err) {
        res.end();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = app;
