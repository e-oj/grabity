## [![Travis](https://img.shields.io/travis/e-oj/grabity.svg?style=flat-square)](https://travis-ci.org/e-oj/grabity) [![npm](https://img.shields.io/npm/l/grabity.svg?style=flat-square)](https://www.npmjs.com/package/grabity) [![npm](https://img.shields.io/npm/v/grabity.svg?style=flat-square)](https://www.npmjs.com/package/grabity)

# grabity
## Get preview data from a link. Just grab it!

```javascript
let grabity = require("grabity");
 
(async () => {
  let it = await grabity.grabIt("https://github.com/e-oj/grabity");
  
  console.log(it);
})();
/*
  { 
    title: 'e-oj/grabity',
    description: 'grabity - Gets preview data from a link. Just grab it!',
    image: 'https://avatars0.githubusercontent.com/u/9700116?s=400&v=4' 
  }
  */
```

