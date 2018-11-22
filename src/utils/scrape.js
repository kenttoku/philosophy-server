const rp = require('request-promise');
const cheerio = require('cheerio');
const BASE_URL = 'https://en.wikipedia.org';

const getLink = async search => {
  let html;
  try {
    html = await rp(BASE_URL + search);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('error');
    return;
  }
  let $ = cheerio.load(html);
  $('table').remove();
  $('.thumbcaption').remove();
  // console.log($.html());
  console.log('running');
  let title = ($('h1#firstHeading').text()).trim();

  let links = await $('#mw-content-text > .mw-parser-output a');
  links.each((i, elm) => {
    search = $(elm).attr('href');
    if (!/^\/wiki\//.test(search)) return true;

    const parent = $(elm).parent()[0].name;
    if (parent !== 'p' && parent !== 'li') return true;

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

module.exports = getLink;