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
exports.grabInfo = async (url, userAgent) => {
  let og = {};
  let twitter = {};
  let defaults = {};

  const resourceLoader = new jsdom.ResourceLoader({ userAgent: userAgent });

  try{
    let dom = await JSDOM.fromURL(url, {virtualConsole, resources: resourceLoader});
    let doc = dom.window.document;
    let metaEls = doc.getElementsByTagName("meta");
    let linkEls = doc.getElementsByTagName("link");
    let titleTag = doc.getElementsByTagName("title");
    let metaDescTag = doc.querySelector("meta[name='description']");

    if(titleTag.length){
      defaults.title = titleTag[0].textContent;
    }

    if(metaDescTag){
      defaults.description = metaDescTag.content;
    }

    for(let meta of metaEls){
      filterInfo(meta, OG_PROP, og);
      filterInfo(meta, TWITTER_PROP, twitter);
    }

    let favicon = findFavicon(linkEls);

    return {og, twitter, favicon, defaults};
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
exports.grabAll = async (url, userAgent) => {
  let res = {};

  const resourceLoader = new jsdom.ResourceLoader({ userAgent: userAgent });

  try {
    let dom = await JSDOM.fromURL(url, {virtualConsole, resources: resourceLoader});
    let doc = dom.window.document;
    let metaEls = doc.getElementsByTagName("meta");
    let linkEls = doc.getElementsByTagName("link");
    let titleTag = doc.getElementsByTagName("title");
    let metaDescTag = doc.querySelector("meta[name='description']");

    if(titleTag.length){
      res.title = titleTag[0].textContent;
    }

    if(metaDescTag){
      res.description = metaDescTag.content;
    }

    for(let meta of metaEls){
      filterAll(meta, "og:", res);
      filterAll(meta, "twitter:", res);
    }
    
    res.favicon = findFavicon(linkEls);

    return res;
  }
  catch(err){
    throw err;
  }
};

/**
 * Try to find a valid favicon from all of the dom's links
 *
 * @param links an array of dom 'link' elements
 * @returns the href of the favicon, if found
 */
function findFavicon(links){
  let favicon = '';

  // Prioritise links with rel of 'icon'
  for(let link of links){
    if (link.rel === 'icon' && link.href){
      favicon = link.href;
    }
  }

  // Check links with rel including 'icon'
  if (!favicon) {
    for(let link of links){
      if (link.rel.includes('icon') && link.href){
        favicon = link.href;
      }
    }
  }

  // Check links with href containing 'favicon'
  if (!favicon) {
    for(let link of links){
      if (link.href.includes('favicon')){
        favicon = link.href;
      }
    }
  }

  return favicon
}

/**
 * Filter for all og and twitter properties
 * in a meta tag
 *
 * @param meta the meta dom element
 * @param prefix "og:" or "twitter:"
 * @param resObj properties attached here
 */
function filterAll(meta, prefix, resObj){
  let prop = prefix === "og:" ? OG_PROP : TWITTER_PROP;

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
  let ogTags = ["og:title", "og:description", "og:image"];
  let twitterTags = ["twitter:title", "twitter:description", "twitter:image"];
  let tags = _prop === OG_PROP ? ogTags : twitterTags;


  for(let tag of tags){
    if (prop !== tag) continue;

    resObj[prop.split(":")[1]] = meta.getAttribute(CONTENT);
  }
}
