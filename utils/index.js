/**
 * @author EmmanuelOlaojo
 * @since 11/18/17
 */

let jsdom = require("jsdom");
const {JSDOM} = jsdom;
const virtualConsole = new jsdom.VirtualConsole();

const OG_PROP = "property";
const TWITTER_PROP = "name";
const CONTENT = "content";

virtualConsole.sendTo(console, {omitJSDOMErrors: true});

/**
 * Gets og/twitter title, description, image
 * from a url
 *
 * @param url the url
 *
 * @returns {Promise.<{og: {}, twitter: {}}>}
 */
exports.grabInfo = async (url) => {
  let og = {};
  let twitter = {};

  try{
    let dom = await JSDOM.fromURL(url, {virtualConsole});
    let doc = dom.window.document;
    let metaEls = doc.getElementsByTagName("meta");
    let linkEls = doc.getElementsByTagName("link");

    for(let meta of metaEls){
      filterInfo(meta, OG_PROP, og);
      filterInfo(meta, TWITTER_PROP, twitter);
    }

    let favicon;

    for(let link of linkEls){
      if (link.rel === 'icon' && link.href){
        favicon = link.href;
      }
    }

    return {og, twitter, favicon};
  }
  catch(err){
    throw err;
  }
};

/**
 * Gets all Open Graph and Twitter Card
 * properties from a url
 *
 * @param url the url
 *
 * @returns {Promise.<*>}
 */
exports.grabAll = async (url) => {
  let res = {};

  try {
    let dom = await JSDOM.fromURL(url, {virtualConsole});
    let doc = dom.window.document;
    let metaEls = doc.getElementsByTagName("meta");
    let linkEls = doc.getElementsByTagName("link");

    for(let meta of metaEls){
      filterAll(meta, "og:", res);
      filterAll(meta, "twitter:", res);
      filterAll(meta, "article:", res)
    }

    for(let link of linkEls){
      if (link.rel === 'icon' && link.href){
        res.favicon = link.href;
      }
    }

    return res;
  }
  catch(err){
    throw err;
  }
};

/**
 * Filter for all og and twitter properties
 * in a meta tag
 *
 * @param meta the meta dom element
 * @param prefix "og:" or "twitter:"
 * @param resObj properties attached here
 */
function filterAll(meta, prefix, resObj){
  let prop = (prefix === "og:" || prefix === "article:") ? OG_PROP : TWITTER_PROP;

  if(meta.hasAttribute(prop)){
    let tag = meta.getAttribute(prop);

    if(tag.startsWith(prefix)){
      resObj[tag] = meta.getAttribute(CONTENT);
    }
  }
}

/**
 * Filter for og/twitter title, image, and
 * description properties in a meta tag
 *
 * @param meta the meta dom element
 * @param _prop OG_PROP or TWITTER_PROP
 * @param resObj properties attached here
 */
function filterInfo(meta, _prop, resObj){
  if(!meta.hasAttribute(_prop)) return;

  let prop = meta.getAttribute(_prop);
  let ogTags = ["og:title", "og:description", "og:image", "article:published_time"];
  let twitterTags = ["twitter:title", "twitter:description", "twitter:image"];
  let tags = _prop === OG_PROP ? ogTags : twitterTags;


  for(let tag of tags){
    if (prop !== tag) continue;

    resObj[prop.split(":")[1]] = meta.getAttribute(CONTENT);
  }
}
