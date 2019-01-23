const fs = require("fs");
const Express = require("./express.js");
const app = new Express();

const loadComments = function() {
  let comments_file = "./private_data/comments.json";
  if (!fs.existsSync(comments_file)) {
    fs.writeFileSync(comments_file, "[]", "utf8");
  }
  const commentsJSON = fs.readFileSync(comments_file, "utf8");
  return JSON.parse(commentsJSON);
};

const comments = loadComments();

const readPostBody = function(req, res, next) {
  let body = "";
  req.on("data", chunk => (body += chunk));
  req.on("end", () => {
    req.body = body;
    next();
  });
};

const readArgs = text => {
  let args = {};
  const splitKeyValue = pair => pair.split("=");
  const assignKeyValueToArgs = ([key, value]) => {
    args[key] = unescape(unescape(value));
  };
  text
    .split("&")
    .map(splitKeyValue)
    .forEach(assignKeyValueToArgs);
  return args;
};

const saveComment = function(req, res, next) {
  const comment = readArgs(req.body);
  comment.date = new Date();
  comments.unshift(comment);
  fs.writeFile(
    "./private_data/comments.json",
    JSON.stringify(comments),
    err => {
      if (err) send(res, 500, "");
      next();
    }
  );
};

const requestHandler = function(req, res) {
  let filePath = "./public/" + req.url;
  if (req.url == "/") {
    filePath = "./public/index.html";
  }
  readFile(filePath, res);
};

const readFile = function(filePath, res) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      send(res, 404, "Page Not Found");
      return;
    }
    send(res, 200, content);
  });
};

const send = function(res, statusCode, content) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
};

const serveCommentsJSON = function(req, res) {
  send(res, 200, JSON.stringify(comments));
};

app.use(readPostBody);
app.post("/guest_book.html", saveComment);
app.get("/comments", serveCommentsJSON);
app.use(requestHandler);

module.exports = app.handleRequest.bind(app);
