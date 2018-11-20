const rp = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://en.wikipedia.org';

const isValid = (ref, paragraph) => {
  return;
};

const getLink = async search => {
  let html = await rp(BASE_URL + search);
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
  return [search, title];
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

toLoop('/wiki/Apple');