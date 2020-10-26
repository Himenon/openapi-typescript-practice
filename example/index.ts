import { ArticleApi } from "../lib/Article"

const main = async () => {
  const client = new ArticleApi();

  const result = await client.get({
    articleId: 123
  });

  result.body;
}

main().catch(console.error);
