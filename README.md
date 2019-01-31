## [![Travis](https://img.shields.io/travis/e-oj/grabity.svg?style=flat-square)](https://travis-ci.org/e-oj/grabity) [![npm](https://img.shields.io/npm/l/grabity.svg?style=flat-square)](https://www.npmjs.com/package/grabity) [![npm](https://img.shields.io/npm/v/grabity.svg?style=flat-square)](https://www.npmjs.com/package/grabity)

# grabity
## Get preview data from a link. Just grab it! 🎣

[og]: <http://ogp.me/>
[twitter]: <https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup>

Grabity looks through [Open Graph](http://ogp.me/) and [Twitter Cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup) markup to get Information about a link. Its functions will return as much data as they can from the markup. If no [og] or [twitter] tags are found, it will default to the content of the <title> tag and meta description, and if either the title tag or meta description is missing, the returned property will be empty.

## Getting Started:
```
npm install grabity
```

## Usage:
It's really quite simple:
```javascript
let grabity = require("grabity");

(async () => {
  let it = await grabity.grabIt("https://github.com/e-oj/grabity");

  console.log(it);
})();
```

Should produce:
```
{
  title: 'e-oj/grabity',
  description: 'grabity - Get preview data from a link. Just grab it! 🎣',
  image: 'https://avatars0.githubusercontent.com/u/9700116?s=400&v=4',
  favicon: 'https://assets-cdn.github.com/favicon.ico'
}
```

## API

### grabity.grabIt(url): Gets a title, description, image, and favicon from a url
 > url (required): url to be used

 > returns: object containing title, description, image, and favicon if found

 Gets the [og] or [twitter] title, description and image from a url, as well as the favicon, and returns them in an object. If [og] and [twitter] tags exist for a property, the [og] tag is given preference. The [twitter] tag is selected if an [og] tag does not exist for a property. If there is no tag ([og] or [twitter]) for a property, that property is not included in the returned object.

 ```javascript
let grabity = require("grabity");

(async () => {
  let it = await grabity.grabIt("https://www.flickr.com");

  console.log(it);
})();
```

result:
```
{
  title: 'Flickr, a Yahoo company',
  description: 'Flickr is almost certainly the best online photo management and sharing application in the world. Show off your favorite photos and videos to the world, securely and privately show content to your friends and family, or blog the photos and videos you take with a cameraphone.',
  image: 'https://farm4.staticflickr.com/3914/15118079089_489aa62638_b.jpg',
  favicon: 'https://s.yimg.com/pw/favicon.ico'
}
```

### grabity.grab(url): Gets all [og] + [twitter] tags and their values, as well as the favicon,
 > url (required): url to be used

 > returns: object containing all found [og] + [twitter] tags and values, and favicon

 Gets all existing [og] and [twitter] tags, as well as the favicon, from the markup and returns them in an object.

```javascript
let grabity = require("grabity");

(async () => {
  let tags = await grabity.grab("https://www.flickr.com");

  console.log(tags);
})();
```

result:
```
{
  'og:site_name': 'Flickr',
  'og:updated_time': '2017-11-19T21:29:36.577Z',
  'og:title': 'Flickr, a Yahoo company',
  'og:type': 'website',
  'og:description': 'Flickr is almost certainly the best online photo management and sharing application in the world. Show off your favorite photos and videos to the world, securely and privately show content to your friends and family, or blog the photos and videos you take with a cameraphone.',
  'og:image': 'https://farm4.staticflickr.com/3914/15118079089_489aa62638_b.jpg',
  'twitter:card': 'summary_large_image',
  'twitter:creator': '@flickr',
  'twitter:title': 'Flickr, a Yahoo company',
  'twitter:description': 'Flickr is almost certainly the best online photo management and sharing application in the world. Show off your favorite photos and videos to the world, securely and privately show content to your friends and family, or blog the photos and videos you take with a cameraphone.',
  'twitter:image:src': 'https://farm4.staticflickr.com/3914/15118079089_489aa62638_b.jpg',
  favicon: 'https://s.yimg.com/pw/favicon.ico'
}

```
<br>

## Test
To test this module, cd to the project directory and run:
```
npm run-script test-server
```

then in a seperate terminal:
```
npm test
```
*Note: The test server runs on port 9973 by default. You can change the port number in test_setup/config.js*
