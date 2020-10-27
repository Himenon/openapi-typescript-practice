import { ArticleApi, Configuration } from "@himenon/openapi-practice/Article";

const main = async () => {
  const client = new ArticleApi(
    new Configuration({
      fetchApi: require("node-fetch"),
    })
  );

  const result = await client.get({
    articleId: 123,
  });

  console.log({ result });
};

main().catch(console.error);
