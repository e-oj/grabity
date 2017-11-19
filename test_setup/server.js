/**
 * @author EmmanuelOlaojo
 * @since 11/18/17
 */

let path = require("path");
let express = require("express");

let {PORT} = require("./config");

let app = express();

app.route("/test").get( (req, res) => {
  res.sendFile(path.join(__dirname, "test.html"), err => {
    if(err) throw err;
  });
});

app.listen(PORT);
console.log(`grabity's test files served on port ${PORT}`);