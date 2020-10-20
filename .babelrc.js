// @ts-check
const presetEnv = require("@babel/preset-env");
const classProperties = require("@babel/plugin-proposal-class-properties");
const exportDefaultFrom = require("@babel/plugin-proposal-export-default-from");
const exportNamespaceFrom = require("@babel/plugin-proposal-export-namespace-from");
const runtime = require("@babel/plugin-transform-runtime");
const devExpression = require("babel-plugin-dev-expression");
const addExports = require("babel-plugin-add-module-exports");

const generateModules = (envName) => {
  if (envName === "cjs") {
    return "commonjs";
  }
  if (envName === "esm") {
    return false;
  }
  return "auto";
};

const generatePlugins = (modules) => {
  return [
    [classProperties, { loose: true }],
    exportDefaultFrom,
    exportNamespaceFrom,
    [runtime, { useESModules: !modules }],
    devExpression,
    modules && addExports,
  ].filter(Boolean);
};

module.exports = (api) => {
  const envName = api.env();
  const modules = generateModules(envName);
  return {
    presets: [
      [
        presetEnv,
        {
          modules,
        },
      ],
      "@babel/preset-typescript",
    ],
    plugins: generatePlugins(modules),
  };
};
