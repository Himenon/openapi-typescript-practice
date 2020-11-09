import * as path from "path";

export const endpoints = ["localhost"];

export const pkgRoot = path.resolve(__dirname, "../../");

export const licenseFile = path.resolve(pkgRoot, "../../LICENSE");

export const endpointsDir = path.resolve(pkgRoot, "endpoints");

export const docsDir = path.resolve(pkgRoot, "docs");

export const distDir = path.resolve(pkgRoot, "dist");

export const sourceDir = path.resolve(pkgRoot, "source");

export const endpointsOutputDir = path.join(docsDir, "endpoints");

export const libDir = path.resolve(pkgRoot, "lib");

export const libCjsDir = path.resolve(libDir, "cjs");

export const libEsmDir = path.resolve(libDir, "esm");

export const libTypesDir = path.resolve(libDir, "types");

export const redocDir = path.join(docsDir, "redoc");

export const tmpSwaggerUiDir = ".tmp_swagger-ui";
