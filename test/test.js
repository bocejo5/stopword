/* global describe */
/* global it */

const should = require('should')
const sw = require('../lib/stopword.js')

describe('general stopwordiness:', function () {
  it('should remove stopwords, should default to english, should preserve case', function () {
    const oldString = 'a really Interesting string with some words'.split(' ')
    const newString = sw.removeStopwords(oldString)
    should.exist(sw.removeStopwords(oldString))
    newString.should.eql([ 'really', 'Interesting', 'string', 'words' ])
  })

  it('should remove custom stopwords', function () {
    const oldString = 'a really interesting string with some words'.split(' ')
    const newString = sw.removeStopwords(oldString, ['interesting'])
    newString.should.eql([ 'a', 'really', 'string', 'with', 'some', 'words' ])
  })

  it('should not remove any stopwords', function () {
    const oldString = 'a really interesting string with some words'.split(' ')
    const newString = sw.removeStopwords(oldString, [])
    newString.should.eql([ 'a', 'really', 'interesting', 'string', 'with', 'some', 'words' ])
  })

  it('should remove stopwords that have a non standard separator', function () {
    const oldString = 'a.really,interesting string.with,some.words'.split(/[\\., ]+/)
    const newString = sw.removeStopwords(oldString)
    newString.should.eql([ 'really', 'interesting', 'string', 'words' ])
  })

  it('should specify a custom input separator', function () {
    const oldString = 'a-really-interesting-string-with-some words'.split('-')
    const newString = sw.removeStopwords(oldString)
    newString.should.eql([ 'really', 'interesting', 'string', 'some words' ])
  })

  it('should remove norwegian stopwords', function () {
    const oldString = 'dette er en tekst som har nørske tegn øæåø øæåø æææ'.split(' ')
    const newString = sw.removeStopwords(oldString, sw.no)
    newString.should.eql([ 'tekst', 'nørske', 'tegn', 'øæåø', 'øæåø', 'æææ' ])
  })

  it('should remove swedish stopwords and preserve case', function () {
    const oldString = 'Trädgårdsägare är beredda att pröva vad som helst för att bli av med de hatade mördarsniglarna åäö'.split(' ')
    const newString = sw.removeStopwords(oldString, sw.sv)
    newString.should.eql([ 'Trädgårdsägare', 'beredda', 'pröva', 'helst', 'hatade', 'mördarsniglarna', 'åäö' ])
  })

  it('should remove danish stopwords', function () {
    const oldString = 'gæsterne i musikhuset i aarhus bør fremover sende en venlig tanke til den afdøde købmand herman salling når de skal til koncert eller se teater i det aarhusianske kulturhus æøå'.split(' ')
    const newString = sw.removeStopwords(oldString, sw.da)
    newString.should.eql([ 'gæsterne', 'musikhuset', 'aarhus', 'bør', 'fremover', 'sende', 'venlig', 'tanke', 'afdøde', 'købmand', 'herman', 'salling', 'koncert', 'teater', 'aarhusianske', 'kulturhus', 'æøå' ])
  })

  it('should remove hindu stopwords', function () {
    const oldString = 'केंद्र सरकार पर्यावरण के माकूल घरों ग्रीन होम्स को बढ़ावा देने की दिशा में गंभीरता से सोच रही है। ग्रीन हाउसिंग सोसायटी डिवेलप करने के लिए सरकार सस्ते लोन'.split(' ')
    const newString = sw.removeStopwords(oldString, sw.hi)
    newString.should.eql([ 'केंद्र', 'सरकार', 'पर्यावरण', 'माकूल', 'घरों', 'ग्रीन', 'होम्स', 'बढ़ावा', 'देने', 'दिशा', 'गंभीरता', 'सोच', 'रही', 'है।', 'ग्रीन', 'हाउसिंग', 'सोसायटी', 'डिवेलप', 'सरकार', 'सस्ते', 'लोन' ])
  })

  it('should remove spanish stopwords', function () {
    const oldString = 'los investigadores han analizado el adn de los restos de unos 200 gatos tomados de momias egipcias yacimientos vikingos y cuevas de la edad de piedra entre otros lugares variopintos'.split(' ')
    const newString = sw.removeStopwords(oldString, sw.es)
    newString.should.eql([ 'investigadores', 'han', 'analizado', 'adn', 'restos', 'unos', '200', 'gatos', 'tomados', 'momias', 'egipcias', 'yacimientos', 'vikingos', 'cuevas', 'edad', 'piedra', 'entre', 'otros', 'lugares', 'variopintos' ])
  })

})

describe('error handling', function () {
  it('should return throw an error if specified language is not supported', function () {
    (function () {
      sw.getStopwords('xx')
    }).should.throw()
  })
})
