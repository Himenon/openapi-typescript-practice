import { shell } from "./shell";

interface Params {
  filename: string;
  output: string;
}

export const convertYamlToJson = ({
  filename,
  output,
}: Params): Promise<any> => {
  return shell(`yarn swagger-cli bundle -r ${filename} -o ${output}`);
};
