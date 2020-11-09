import { EOL } from "os";
import * as fs from "fs";
import * as path from "path";
import { redocDir } from "./config";

export const generateRedocHtml = () => {
  const paths = fs.readdirSync("./docs");
  const html = fs.readFileSync("./templates/redoc/index.html", {
    encoding: "utf-8",
  });
  const list = paths
    .map((uri) => {
      return `<a class="dropdown-item" href="${uri}" target="view" />${uri}</a>`;
    })
    .join(EOL);
  fs.writeFileSync(
    path.join(redocDir, "index.html"),
    html.replace(/\${list}/, list),
    {
      encoding: "utf-8",
    }
  );
};
