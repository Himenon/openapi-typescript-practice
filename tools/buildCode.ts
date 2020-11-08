import * as path from "path";
import * as Config from "./builder/config";
import { convertYamlToJson } from "./builder/convertOAS3yamlToJson";
import { convertOAS3toSwagger2 } from "./builder/convertOAS3toSwagger2";
import { generateTsCode } from "./builder/generateTsCode";
import { clean } from "./builder/clean";
import { shell } from "./builder/shell";
import { copyPackageSet } from "./builder/copyPackageSet";

export const build = async (endpoint: string): Promise<void> => {
  const params = clean(endpoint);
  const endpointFile = path.join(Config.endpointsDir, endpoint, "index.yml");
  await convertYamlToJson({
    filename: endpointFile,
    output: params.endpointJsonFile,
  });
  const swagger = await convertOAS3toSwagger2(params.endpointJsonFile);
  await generateTsCode(params.tsFile, JSON.parse(swagger));

  await shell(`eslint --fix ${params.tsFile}`);
};

const main = async () => {
  const promises = Config.endpoints.map(build);
  await Promise.all(promises);

  await Promise.all([
    shell(`yarn tsc -p tsconfig.cjs.json`),
    shell(`yarn tsc -p tsconfig.esm.json`),
    shell(
      `yarn tsc -p tsconfig.esm.json -d --emitDeclarationOnly --outDir ${Config.libTypesDir}`
    ),
  ]);

  await shell(
    `cherry-pick --types-dir ./types --cjs-dir ./cjs --esm-dir ./esm --cwd ${
      Config.libDir
    } --input-dir ../${path.basename(Config.sourceDir)}`
  );

  await copyPackageSet();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
