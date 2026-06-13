import { Router } from "express";

import { readdirSync } from "fs";
import { basename as _basename, join } from "path";

const router = Router();
const basename = _basename(__filename);

readdirSync(__dirname)
  .filter(
    (dir) =>
      dir.indexOf(".") !== -1 && dir !== basename && dir.slice(-3) === ".js",
  )
  .map((index) => {
    const fileName = index.split(".js")[0]; // using the name of file to append at the start of routes to make it dynamic
    const mainRoute = fileName ? `/${fileName}` : "/";
    const route = require(join(`${__dirname}/${index}`));
    return router.use(mainRoute, route);
  });

export default router;
