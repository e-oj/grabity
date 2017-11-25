/**
 * @author EmmanuelOlaojo
 * @since 11/17/17
 */

let utils = require("../utils/index");

/**
 * Gets a title, description and image from
 * a url that implements Open Graph or Twitter
 * Cards markup.
 *
 * @param url the url (where "it" lives)
 * @param options the options. {force: Boolean}
 *
 * @returns {Promise.<{}>}
 */
exports.grabIt = async (url, options) => {
  if(!url) throw new Error("Missing url!");

  try{
    let {og, twitter} = await utils.grabInfo(url, options);
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

/**
 * Gets all Open Graph and Twitter Card
 * properties from a url
 *
 * @param url the url ("it" is here)
 *
 * @returns {Promise.<*>}
 */
exports.grab = async (url) => {
  if(!url) throw new Error("Missing url!");

  try{
    return await utils.grabAll(url);
  }
  catch(err){
    throw err;
  }
};
