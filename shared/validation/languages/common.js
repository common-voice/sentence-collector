var unicode = require('unicode-properties');
var decode = require('urldecode');
var striptags = require('striptags');

function _strip_string(sentence) {
    //letters
    var allowed_categories = ["LC", "Ll", "Lm", "Lo", "Lt", "Lu"];
    //numbers
    allowed_categories.concat(["Nd", "Nl", "No"]);
    //marks
    allowed_categories.concat(["Mc", "Me", "Mn"]);
    //punctuation
    allowed_categories.concat(["Pc", "Pd", "Pe", "Pf", "Pi", "Po", "Ps"]);
    //symbol
    allowed_categories.concat(["Sc", "Sk", "Sm", "So"]);
    //space
    allowed_categories.concat(["Zs"]);
    let st = "";
    for (var s of sentence) {
        if (allowed_categories.includes(unicode.getCategory(s.charCodeAt()))) {
            st = st.concat(s);
        }
    }
    return (st);
}
export function Common (sentence) {
    // Decode any URL encoded elements of sentence
    sentence = decode(sentence);
    // Remove any HTML tags
    sentence = striptags(sentence);
    // Remove non-printable characters
    sentence = _strip_string(sentence);
    // collapse all whitespace and replace with single space
    sentence = sentence.replace(/\s+/g, ' ');
    return (sentence);
}
