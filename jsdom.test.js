/**
 * @author EmmanuelOlaojo
 * @since 11/17/17
 */

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

(async () => {
  const dom = await JSDOM.fromURL("https://www.github.com/e-oj/fawn");

  const doc = dom.window.document;
  let elems = doc.getElementsByTagName("meta");

  for(let meta of elems){
    if(meta.hasAttribute("property")){
      let prop = meta.getAttribute("property");

      if(prop.startsWith("og:")){
        let content = meta.getAttribute("content");

        console.log(prop, content);
      }
    }
  }
})();
