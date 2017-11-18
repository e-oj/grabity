/**
 * @author EmmanuelOlaojo
 * @since 11/16/17
 */

let grabity = require("./index.js");

(async () => {
  let result = await grabity.grabit("https://github.com/e-oj/Fawn");
  console.log(result);
})();