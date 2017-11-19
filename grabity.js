/**
 * @author EmmanuelOlaojo
 * @since 11/17/17
 */

let utils = require("./utils");

exports.grabIt = async (url) => {
  try{
    let {og, twitter} = await utils.grabInfo(url);
    let props = ["title", "description", "image"];
    let res = {};
    let val;

    for(let prop of props){
      val = og[prop] || twitter[prop];

      if(val) res[prop] = val;
    }

    return res;
  }
  catch (err){
    throw err;
  }
};

exports.grab = async (url) => {
  return await utils.grabAll(url);
};

(async () => {
  console.log(await exports.grab("http://localhost:9973/test"));
})();
