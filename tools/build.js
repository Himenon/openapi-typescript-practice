const path = require("path");
const { execSync } = require("child_process");

const sh = (command) => {
  const log = execSync(command, { cwd: process.cwd() }).toString();
  console.log(`Exec: ${command}`)
  console.log(log);
}

const generateCode = (filename) => {
  sh(`yarn openapi-generator-cli generate -g typescript-fetch -i ${filename} -o ./lib/ --additional-properties=typescriptThreePlus=true`);
}

const generateDoc = (filename) => {
  const outputFileName = path.dirname(filename).split("/").pop().toLowerCase();
  sh(`yarn redoc-cli bundle ${filename} -o docs/${outputFileName}.html --options.menuToggle --options.pathInMiddlePane`)
}

const sources = [
  "./endpoints/Article/index.yml",
  "./endpoints/User/index.yml",
];

const validate = (filename) => {
  sh(`yarn openapi-generator-cli validate -i ${filename}`);
}

sources.forEach((source) => {
  // generateCode(source);
  generateDoc(source);
})



