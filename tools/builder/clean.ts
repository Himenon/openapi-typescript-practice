import * as path from "path";
import * as Config from "./config";
import * as rimraf from "rimraf";
import * as logger from "./logger";

const remove = (filename: string) => {
  logger.log(`remove ${filename}`);
  rimraf.sync(filename);
};

export const clean = (endpoint: string) => {
  const endpointJsonFile = path.join(
    Config.endpointsOutputDir,
    endpoint + ".json"
  );
  const tsFile = path.join(Config.sourceDir, endpoint + ".ts");
  const libDir = path.join(Config.libDir, endpoint);
  remove(endpointJsonFile);
  remove(tsFile);
  remove(libDir);
  remove(path.join(Config.libDir, endpoint));
  remove(path.join(Config.libCjsDir, endpoint + "*"));
  remove(path.join(Config.libEsmDir, endpoint + "*"));
  remove(path.join(Config.libTypesDir, endpoint + "*"));

  return {
    endpointJsonFile,
    tsFile,
  };
};
