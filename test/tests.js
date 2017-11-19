/**
 * @author EmmanuelOlaojo
 * @since 11/18/17
 */

let chai = require("chai")
  , expect = chai.expect;

let grabity = require("../lib/grabity");
let {PORT} = require("../test_setup/config");
let tags = require("../test_setup/tags");

let URL = `http://localhost:${PORT}/test`;

describe("grabity", () => {
  describe("#grabIt", () => {
    it("should return title, description and image", async () => {
      let it = await grabity.grabIt(URL);

      expect(it.title).to.equal(tags["og:title"]);
      expect(it.description).to.equal(tags["og:description"]);
      expect(it.image).to.equal(tags["twitter:image"]);
    });
  });

  describe("#grab", () => {
    it("should return all 'twitter:' and 'og:' tags", async () => {
      let it = await grabity.grab(URL);
      let keys = Object.keys(tags);

      for(key of keys){
        expect(it[key]).to.equal(tags[key]);
      }
    });
  });
});
