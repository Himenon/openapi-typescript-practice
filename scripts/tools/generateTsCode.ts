import * as fs from "fs";
import * as path from "path";
import * as logger from "./logger";
import { generateTypeScriptCode } from "@himenon/openapi-typescript-code-generator";

export const generateTsCode = (
  entryPoint: string,
  outputFileName: string
): void => {
  const tsSourceCode = generateTypeScriptCode({
    entryPoint,
  });

  fs.mkdirSync(path.dirname(outputFileName), { recursive: true });
  fs.writeFileSync(outputFileName, tsSourceCode, {
    encoding: "utf-8",
  });

  logger.log(`create ${outputFileName}`);
};
