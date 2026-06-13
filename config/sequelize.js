import { Sequelize } from "sequelize";
import DB from "./config.js";

const sequelize = new Sequelize({
  host: DB.HOST,
  database: DB.DATABASE,
  username: DB.USERNAME,
  password: DB.PASSWORD,
  port: DB.PORT,
  dialect: DB.DIALECT,

  pool: {
    max: DB.POOL.MAX,
    min: DB.POOL.MIN,
    acquire: DB.POOL.ACQUIRE,
    idle: DB.POOL.IDLE,
  },

  dialectOptions: {
    ...(DB.DIALECT_OPTIONS.ssl && { ssl: DB.DIALECT_OPTIONS.ssl }),
    keepAlive: DB.DIALECT_OPTIONS.keepAlive,
  },

  define: {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true, // Native support for your soft-delete wrapper
  },

  logging: DB.LOGGING ? console.log : false,
});

export default sequelize;
