import * as logger from "./logger";
import execa from "execa";

export const shell = (
  command: string,
  cwd: string = process.cwd()
): execa.ExecaChildProcess<string> => {
  logger.info(command);
  return execa(command, {
    stdio: ["pipe", "pipe", "inherit"],
    shell: true,
    cwd,
  });
};
