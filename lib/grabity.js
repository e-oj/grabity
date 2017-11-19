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
 *
 * @returns {Promise.<{}>}
 */
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

/**
 * Gets all Open Graph and Twitter Card properties
 *
 * @param url
 * @returns {Promise.<*>}
 */
exports.grab = async (url) => {
  try{
    return await utils.grabAll(url);
  }
  catch(err){
    throw err;
  }
};
