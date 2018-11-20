const getLink = require('../../utils/scrape');

module.exports = async (root, args) => {
  const { search: next, title } = await getLink('/wiki/Apple');
  return { next, title };
};