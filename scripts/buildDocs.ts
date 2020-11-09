import * as Config from "./tools/config";
import * as fs from "fs-extra";
import * as path from "path";
import * as logger from "./tools/logger";
import { gitSparseClone } from "./tools/gitSparseClone";

const main = async () => {
  const endpointsJson = fs.readdirSync(Config.endpointsOutputDir);
  if (!fs.existsSync(Config.tmpSwaggerUiDir)) {
    await gitSparseClone({
      url: "https://github.com/swagger-api/swagger-ui.git",
      outputLocalDir: Config.tmpSwaggerUiDir,
      repoDir: "dist",
    });
  }
  const suggestions = endpointsJson.map((endpoint) => `endpoints/${endpoint}`);
  fs.copySync(path.join(Config.tmpSwaggerUiDir, "dist"), Config.docsDir);
  const indexHtml = fs.readFileSync(
    path.join(__dirname, "./templates/swagger-ui/index.html.tmpl"),
    { encoding: "utf-8" }
  );
  fs.writeFileSync(
    path.join(Config.docsDir, "index.html"),
    indexHtml.replace("${suggestions}", JSON.stringify(suggestions))
  );
  logger.log("Generate document ./docs");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
