const { ArticleApi, Configuration } = require("../lib/Article");
// import { ArticleApi, Configuration } from "../lib/Article";

const main = async () => {
  const client = new ArticleApi(
    new Configuration({
      fetchApi: require("node-fetch"),
    })
  );

  const result = await client.get({
    articleId: 123,
  });

  console.log(result);
};

main().catch(console.error);
