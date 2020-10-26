const path = require("path");
const { execSync } = require("child_process");

const OUTPUT_DIR = "src";

process.env.TS_POST_PROCESS_FILE =
  "node_modules/prettier/bin-prettier.js --write";
process.env.JAVA_OPTS = "-Dlog.level=warn";

const sh = (command) => {
  const log = execSync(command, { cwd: process.cwd() }).toString();
  console.log(`Exec: ${command}`);
  console.log(log);
};

const generateCode = (filename) => {
  const endpointName = path.dirname(filename).split("/").pop();
  const options = [
    `-i ${filename}`,
    `-o ${path.join(OUTPUT_DIR, endpointName)}`,
    `--generator-name typescript-fetch`,
    `--model-package PKG`,
    `--model-name-prefix ${endpointName}`,
    `--enable-post-process-file`,
    // `--model-name-suffix hoge`,
    `--additional-properties=typescriptThreePlus=true`,
    // https://github.com/OpenAPITools/openapi-generator/issues/2384
    // `--additional-properties supportsES6=true`,
    // `--verbose`,
  ];
  sh(`yarn openapi-generator-cli generate` + " " + options.join(" "));
};

const generateDoc = (filename) => {
  const outputFileName = path.dirname(filename).split("/").pop().toLowerCase();
  sh(
    `yarn redoc-cli bundle ${filename} -o docs/${outputFileName}.html --options.menuToggle --options.pathInMiddlePane`
  );
};

const convertYamlToJson = (filename) => {
  const outputFileName = path.dirname(filename).split("/").pop().toLowerCase();
  sh(`yarn swagger-cli bundle -r ${filename} -o build/${outputFileName}.json`);
};

const format = (source) => {
  sh(`yarn prettier --write ${source}`);
};

const sources = ["endpoints/Article/index.yml", "endpoints/User/index.yml"];

const validate = (filename) => {
  sh(`yarn openapi-generator-cli validate -i ${filename}`);
};

sources.forEach((source) => {
  generateCode(source);
  // generateDoc(source);
  // convertYamlToJson(source);
});

format(OUTPUT_DIR);
