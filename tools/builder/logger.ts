import chalk from "chalk";

const PREFIX_INFO = "info : ";
const PREFIX_LOG = "log  : ";

export const info = (message: string) => {
  console.log(chalk.green(PREFIX_INFO + message));
};

export const log = (message: string) => {
  console.info(PREFIX_LOG + message);
};
