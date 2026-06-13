"use strict";

import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import Sequelize, { DataTypes } from "sequelize";
const basename = _basename(__filename);
import sequelize from "../../config/sequelize";
const model = {};

// below code will itegare each file in currect folder and create model
readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    model[model.name] = model;
  });

Object.keys(model).forEach((modelName) => {
  if (model[modelName].associate) {
    model[modelName].associate(model);
  }
});

model.sequelize = sequelize;
model.Sequelize = Sequelize;

export default model;
