const getLink = require('../../utils/scrape');

module.exports = async (root, args) => {
  const { next, title } = await getLink(`/wiki/${args.search}`);
  await getLink(`/wiki/${args.search}`);
  return { next, title };
};