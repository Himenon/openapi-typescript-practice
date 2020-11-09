import * as fs from "fs";
import * as path from "path";
import cpy from "cpy";
import * as Config from "./config";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../../package.json");

/**
 * README, LICENCE, CHANGELOG.mdをlibディレクトリに出力する
 */
export const copyPackageSet = async (): Promise<void> => {
  const publishPackageJson = path.join(Config.libDir, "package.json");

  pkg.name = pkg.name.replace("-specification", "");
  pkg.private = undefined;
  pkg.scripts = {
    build: "echo 'Already built!'",
  };
  pkg.devDependencies = undefined;
  pkg.main = path.relative(Config.libDir, pkg.main);
  pkg.module = path.relative(Config.libDir, pkg.module);
  pkg.types = path.relative(Config.libDir, pkg.types);
  pkg.publishConfig.directory = undefined; // 不要な設定

  fs.writeFileSync(publishPackageJson, JSON.stringify(pkg, null, 2), {
    encoding: "utf-8",
  });
  await cpy(["README.md", "CHANGELOG.md", Config.licenseFile], Config.libDir);
  console.log("Files copied!");
};
