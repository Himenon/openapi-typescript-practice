// @ts-check
const fs = require("fs");
const path = require("path");
const pkg = require("../package.json");

const publishDir = path.resolve(__dirname, "../", pkg.publishConfig.directory);
const publishPackageJson = path.join(publishDir, "package.json");

pkg.main = path.relative(publishDir, pkg.main);
pkg.module = path.relative(publishDir, pkg.module);
pkg.types = path.relative(publishDir, pkg.types);
pkg.publishConfig.directory = undefined; // 不要な設定

fs.writeFileSync(publishPackageJson, JSON.stringify(pkg, null, 2), {
  encoding: "utf-8",
});
