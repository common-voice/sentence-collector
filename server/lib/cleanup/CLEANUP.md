Please note that cleanup is only run on the txt sentences, not on the meta structure. This should not be used for validation, but rather just for the input into CV through the data folder.

# How to add a new language cleanup

1. Copy the `en.js` file in the `languages` folder and name it according to the new language
2. Adjust the content of the file to represent the new cleanup for this specific language
3. Certain methods can be deleted if not needed, as the default is `en` anyway - so please only implement functions that are different to the `en` cleanups or not needed at all (just return the sentence)
4. In `index.js` add a new require (as example for German - de)

```javascript
const de = require('./languages/de');
```

5. Expose the new require in the `CLEANUPS` object

```javascript
const CLEANUPS = {
  en,
  de,
};
```
