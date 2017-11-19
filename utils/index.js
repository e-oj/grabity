/**
 * @author EmmanuelOlaojo
 * @since 11/18/17
 */

let jsdom = require("jsdom");
const {JSDOM} = jsdom;

const OG_PROP = "property";
const TWITTER_PROP = "name";
const CONTENT = "content";


exports.grabInfo = async (url) => {
  let og = {};
  let twitter = {};

  try{
    let dom = await JSDOM.fromURL(url);
    let doc = dom.window.document;
    let elems = doc.getElementsByTagName("meta");

    for(let meta of elems){
      filterInfo(meta, OG_PROP, og);
      filterInfo(meta, TWITTER_PROP, twitter);
    }

    return {og, twitter};
  }
  catch(err){
    throw err;
  }
};

exports.grabAll = async (url) => {
  let res = {};

  try {
    let dom = await JSDOM.fromURL(url);
    let doc = dom.window.document;
    let elems = doc.getElementsByTagName("meta");

    for(let meta of elems){
      filterAll(meta, "og:", res);
      filterAll(meta, "twitter:", res);
    }

    return res;
  }
  catch(err){
    throw err;
  }
};

function filterAll(meta, prefix, resObj){
  let prop = prefix === "og:" ? OG_PROP : TWITTER_PROP;

  if(meta.hasAttribute(prop)){
    let tag = meta.getAttribute(prop);

    if(tag.startsWith(prefix)){
      resObj[tag] = meta.getAttribute(CONTENT);
    }
  }
}

function filterInfo(meta, _prop, resObj){
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

