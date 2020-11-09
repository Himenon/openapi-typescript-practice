import * as Logger from "./tools/logger";
import * as Config from "./tools/config";
import * as rimraf from "rimraf";

const remove = (filename: string) => {
  Logger.info(`remove: ${filename}`);
  rimraf.sync(filename);
};

const main = () => {
  remove(Config.distDir);
  remove(Config.docsDir);
  remove(Config.libDir);
  remove(Config.sourceDir);
  console.log("clean up!");
};

main();
