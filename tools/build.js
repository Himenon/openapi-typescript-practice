// @ts-check
const { green } = require("chalk");
const execa = require("execa");
const path = require("path");
const fs = require("fs");
const { EOL } = require("os");

const OUTPUT_DIR = "src";

process.env.TS_POST_PROCESS_FILE =
  "node_modules/prettier/bin-prettier.js --write";

// OpenAPI CLIのログレベルの指定
process.env.JAVA_OPTS = "-Dlog.level=warn";

const sh = (command) => {
  console.log(green(command));
  return execa(command, { stdio: ["pipe", "pipe", "inherit"], shell: true });
};

const generateAliasTsFile = (name) => {
  const codes = [`export * from "./endpoints/${name}";`];
  fs.writeFileSync(
    path.join(process.cwd(), OUTPUT_DIR, `${name}.ts`),
    codes.join(EOL),
    { encoding: "utf-8" }
  );
};

const generateCode = async (filename) => {
  const endpointName = path.dirname(filename).split("/").pop();
  const options = [
    `-i ${filename}`,
    `-o ${path.join(OUTPUT_DIR, "endpoints", endpointName)}`,
    `--generator-name typescript-fetch`,
    `--model-package PKG`,
    // `--model-name-prefix ${endpointName}`,
    `--enable-post-process-file`,
    // `--model-name-suffix hoge`,
    `--additional-properties=typescriptThreePlus=true`,
    // https://github.com/OpenAPITools/openapi-generator/issues/2384
    // `--additional-properties supportsES6=true`,
    // `--verbose`,
  ];
  await sh(`yarn openapi-generator-cli generate` + " " + options.join(" "));
  generateAliasTsFile(endpointName);
};

/**
 * redoc-cliでドキュメントを生成する
 */
const generateDoc = (filename) => {
  const outputFileName = path.dirname(filename).split("/").pop().toLowerCase();
  return sh(
    `yarn redoc-cli bundle ${filename} -o docs/${outputFileName}.html --options.menuToggle --options.pathInMiddlePane`
  );
};

/**
 * prettierを用いてフォーマットする
 */
const format = (source) => {
  sh(`yarn prettier --write ${source}`);
};

const sources = ["endpoints/Article/index.yml", "endpoints/User/index.yml"];

/**
 * OpenAPI Generatorによるバリデーション
 */
const validate = (filename) => {
  sh(`yarn openapi-generator-cli validate -i ${filename}`);
};

const main = async () => {
  const promises = sources.map(async (source) => {
    await generateCode(source);
    await generateDoc(source);
  });
  await Promise.all(promises);
  format(OUTPUT_DIR);
};

main().catch(console.error);
