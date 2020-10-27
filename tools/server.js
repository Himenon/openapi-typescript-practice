// @ts-check
const { green, cyan, bgGreen } = require("chalk");
const execa = require("execa");
const path = require("path");
const chokidar = require("chokidar");

const PORT = 4000;

process.env.TS_POST_PROCESS_FILE =
  "node_modules/prettier/bin-prettier.js --write";

// OpenAPI CLIのログレベルの指定
process.env.JAVA_OPTS = "-Dlog.level=warn";

/**
 * swagger-cli で yamlをjson化する
 */
const convertYamlToJson = (filename, outputFileName) => {
  return sh(`yarn swagger-cli bundle -r ${filename} -o ${outputFileName}`);
};

const sh = (command) => {
  console.log(green(command));
  return execa(command, { stdio: ["pipe", "pipe", "inherit"], shell: true });
};

const run = async (filename) => {
  const outputFileName = path.dirname(filename).split("/").pop().toLowerCase();
  const outputFilePath = `build/${outputFileName}.json`;

  console.info(bgGreen(" INFO ") + " output json     : " + outputFilePath);

  await convertYamlToJson(filename, outputFileName);
  const subprocess = sh(`prism mock -p ${PORT} ${outputFilePath}`);
  subprocess.stdout.pipe(process.stdout);
  const kill = () => {
    subprocess.kill("SIGTERM");
  };
  return kill;
};

const main = async () => {
  const filename = process.argv[2];
  const endpointDirectory = path.dirname(filename);
  console.info(bgGreen(" INFO ") + " watch directory : " + endpointDirectory);
  const watcher = chokidar.watch(endpointDirectory, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  });
  let kill = await run(filename);
  watcher.on("change", async () => {
    kill();
    console.log("");
    console.log(cyan("Restart"));
    kill = await run(filename);
  });
};

main().catch(console.error);
