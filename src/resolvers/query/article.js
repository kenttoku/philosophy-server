const getLink = require('../../utils/scrape');
const Article = require('../../models/article-model');

module.exports = async (root, args) => {
  const { next, title } = await getLink(`/wiki/${args.search}`);
  return await Article.findOneAndUpdate(
    { title },
    { next, title },
    { upsert: true, new: true },
  );
};