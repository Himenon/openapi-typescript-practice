import * as fs from "fs";
import * as path from "path";
import * as logger from "./logger";
import { CodeGen } from "swagger-typescript-codegen";

const readTemplate = (filename: string): string => {
  return fs.readFileSync(path.join(__dirname, filename), { encoding: "utf-8" });
};

export const generateTsCode = async (
  filename: string,
  swagger: any
): Promise<void> => {
  const tsSourceCode = CodeGen.getTypescriptCode({
    className: "Client",
    swagger,
    template: {
      class: readTemplate("../templates/codegen/class.mustache"),
      method: readTemplate("../templates/codegen/method.mustache"),
      type: readTemplate("../templates/codegen/type.mustache"),
    },
    // imports: ["../../typings/tsd.d.ts"],
  });

  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, tsSourceCode, {
    encoding: "utf-8",
  });

  logger.log(`create ${filename}`);
};
