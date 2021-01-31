import * as path from "path";
import * as Config from "./tools/config";
import { convertYamlToJson } from "./tools/convertOAS3yamlToJson";
import { generateTsCode } from "./tools/generateTsCode";
import { clean } from "./tools/clean";
import { shell } from "./tools/shell";
import { copyPackageSet } from "./tools/copyPackageSet";

export const build = async (endpoint: string): Promise<void> => {
  const params = clean(endpoint);
  const entryPoint = path.join(Config.endpointsDir, endpoint, "index.yml");
  await convertYamlToJson({
    filename: entryPoint,
    output: params.endpointJsonFile,
  });
  generateTsCode(entryPoint, params.tsFile);

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
