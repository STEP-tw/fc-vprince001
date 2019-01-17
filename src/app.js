const fs = require("fs");

const app = (req, res) => {
  try {
    fs.readFile("." + req.url, function(err, contents) {
      if (err) {
        res.end();
        return;
      }
      res.statusCode = 200;
      res.write(contents);
      res.end();
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = app;
