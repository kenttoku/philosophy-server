const rp = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://en.wikipedia.org';

const isValid = (ref, paragraph) => {
  return;
};

const getLink = async search => {
  let html;
  try {
    html = await rp(BASE_URL + search);
  } catch (e) {
    return;
  }
  let $ = cheerio.load(html);
  let title = ($('h1#firstHeading').text()).trim();
  let links = await $('#mw-content-text > .mw-parser-output > p > a', html);
  links.each((i, elm) => {
    search = $(elm).attr('href');
    const parens = $(elm).parent().html().match(/\(([^)]+)\)/g);
    if (parens) {
      const parensText = parens.join('');
      if (!parensText.includes(search)) {
        return false;
      }
    } else {
      return false;
    }
  });

  html = await rp(BASE_URL + search);
  $ = cheerio.load(html);
  const next = ($('h1#firstHeading').text()).trim();
  return { search, title, next };
};

const toLoop = async search => {
  const results = [];
  let title;

  while (!results.includes(title)) {
    results.push(title);
    [search, title] = await getLink(search);
  }
  results[0] = results.indexOf(title);
  console.log(results);
};

module.exports = getLink;