const { LANGUAGE } = require('../enums');

function getLanguage(input) {
  // Regular expression pattern to match Myanmar characters
  const myanmarPattern =
    /^[\u1000-\u109F\uAA60-\uAA7F\uA9E0-\uA9FF\uAA00-\uAA5F\u200C\u200D\s]+$/;

  return myanmarPattern.test(input) ? LANGUAGE.MM : LANGUAGE.EN;
}

module.exports = getLanguage;
