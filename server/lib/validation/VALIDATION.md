# How to add a new language validation

1. Copy the `en.js` file in the `languages` folder and name it according to the new language
2. Adjust the content of the file to represent the new requirements for this specific language
3. Certain methods can be deleted if not needed, as the default is `en` anyway - so please only implement functions that are different to the `en` validations
4. Make sure to update the comments as well
5. In `index.js` add a new require (as example for German - de)

```
const de = require('./languages/de');
```

6. Expose the new require in the `VALIDATORS` object

```
const VALIDATORS = {
  en,
  de,
};
```