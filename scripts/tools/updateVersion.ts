import * as fs from "fs";
import * as logger from "./logger";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../../package.json");

export const updateVersion = (endpointFileName: string): void => {
  const doc = JSON.parse(
    fs.readFileSync(endpointFileName, { encoding: "utf-8" })
  );
  doc.info.version = pkg.version;
  fs.writeFileSync(endpointFileName, JSON.stringify(doc, null, 2), {
    encoding: "utf-8",
  });
  logger.info(`Version Up: ${endpointFileName}`);
};
