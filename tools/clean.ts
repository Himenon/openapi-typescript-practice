import * as Logger from "./builder/logger";
import * as Config from "./builder/config";
import * as rimraf from "rimraf";

const remove = (filename: string) => {
  Logger.info(`remove: ${filename}`);
  rimraf.sync(filename);
};

const main = () => {
  remove(Config.distDir);
  remove(Config.docsDir);
  remove(Config.libDir);
  remove(Config.tmpSwaggerUiDir);
  remove(Config.sourceDir);
  console.log("clean up!");
};

main();
