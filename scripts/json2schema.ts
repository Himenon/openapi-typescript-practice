import * as fs from "fs";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const json2yaml = require("json2yaml");

const isNull = (value: any): value is null => {
  return value === null;
};

const isObject = (value: any): value is object => {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
};

const isString = (value: any): value is string => {
  return typeof value === "string";
};

const isInteger = (value: any): value is number => {
  return typeof value === "number";
};

const isArray = (value: any): value is any[] => {
  return typeof value === "object" && Array.isArray(value);
};

const getStringProp = (nullable?: boolean, description?: string) => {
  return {
    type: "string",
    nullable,
    description,
  };
};

const getObjectProp = (properties: {}, nullable?: boolean) => {
  return {
    type: "object",
    nullable,
    properties,
    additionalProperties: false,
  };
};

const getIntegerProp = (nullable?: boolean) => {
  return {
    type: "integer",
    nullable,
  };
};

const getArrayProp = (children?: string | any, nullable?: boolean) => {
  const items = typeof children === "string" ? { type: children } : children;
  return {
    type: "array",
    items,
    nullable,
  };
};

const convertChild = (value: any, objectConvert?: any): any => {
  if (isString(value)) {
    return getArrayProp(getStringProp());
  } else if (isInteger(value)) {
    return getArrayProp(getIntegerProp());
  } else if (isObject(value)) {
    return getObjectProp(objectConvert(value));
  } else if (isArray(value)) {
    return getArrayProp(convertChild(value));
  }
  throw new Error("わからん" + value);
};

const convert = (obj: { [key: string]: any }) => {
  const result: { [key: string]: any } = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (isString(value)) {
      result[key] = getStringProp();
    } else if (isInteger(value)) {
      result[key] = getIntegerProp();
    } else if (isNull(value)) {
      result[key] = getStringProp(true, "Unknown Type");
    } else if (isObject(value)) {
      result[key] = getObjectProp(convert(value));
    } else if (isArray(value)) {
      if (value.length > 0) {
        result[key] = getArrayProp(convertChild(value[0], convert));
      } else {
        console.log(
          `key = ${key} は配列の長さが0のため、詳細の情報が記載されません`
        );
        result[key] = getArrayProp("object");
      }
    }
  });
  return result;
};

/**
 * jsonToOas2 sample.json
 */
const main = () => {
  const filename = process.argv[2] as string;
  if (typeof filename !== "string") {
    console.error("読みこむjsonのファイルパスを指定してください");
    return;
  }
  const data = JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
  const result = convertChild(data, convert);
  console.log(json2yaml.stringify(result));
};

main();
