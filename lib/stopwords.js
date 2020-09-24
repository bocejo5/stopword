var defaultStopwords = require('./stopwords_en.js').words

exports.removeStopwords = function (tokens, stopwords) {
  stopwords = stopwords || defaultStopwords
  if (typeof tokens !== 'object' || typeof stopwords !== 'object') {
    throw new Error('expected Arrays try: removeStopwords(Array[, Array])')
  }
  return tokens.filter(function (value) {
    return stopwords.indexOf(value.toLowerCase()) === -1
  })
}

exports.en = require('./stopwords_en.js').words
exports.es = require('./stopwords_es.js').words
exports.fr = require('./stopwords_fr.js').words
exports.it = require('./stopwords_it.js').words