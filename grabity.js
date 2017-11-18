/**
 * @author EmmanuelOlaojo
 * @since 11/17/17
 */

let jsdom = require("jsdom");
const {JSDOM} = jsdom;

const OG_PROP = "property";
const TWITTER_PROP = "name";
const CONTENT = "content";

exports.grabit = async (url) => {
  let {og, twitter} = await grabInfo(url);
  let props = ["title", "description", "image"];
  let res = {};

  for(let prop of props){
    res[prop] = og[prop] || twitter[prop];
  }

  return res;
};

exports.grab = async (url, _options) => {
  let options = cleanOptions(_options);

};

function cleanOptions(options){
  let props = ["og", "twitter"];
  let clean = {};

  for(let prop of props){
    let choice = options[prop];

    if(!choice) continue;

    if(typeof choice !== "boolean"){
      throw new Error(`Option ${prop} should be boolean`);
    }

    clean[prop] = choice;
  }

  return clean;
}

async function grabInfo(url){
  let og = {};
  let twitter = {};

  try{
    const dom = await JSDOM.fromURL(url);
    const doc = dom.window.document;
    let elems = doc.getElementsByTagName("meta");

    for(let meta of elems){
      filter(meta, OG_PROP, og);
      filter(meta, TWITTER_PROP, twitter);
    }

    return {og, twitter};
  }
  catch(err){
    throw err;
  }
}

function filter(meta, _prop, resObj){
  if(!meta.hasAttribute(_prop)) return;

  let prop = meta.getAttribute(_prop);

  let ogTags = ["og:title", "og:description", "og:image"];
  let twitterTags = ["twitter:title", "twitter:description", "twitter:image"];
  let tags = _prop === OG_PROP ? ogTags : twitterTags;


  for(let tag of tags){
    if (prop !== tag) continue;

    resObj[prop.split(":")[1]] = meta.getAttribute(CONTENT);
  }
}

(async () => {
  console.log(await exports.grabit("https://github.com/e-oj/Fawn"));
})();
