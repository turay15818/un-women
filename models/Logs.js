import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Logs = db.define(
  "logs",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    ipAddress: DataTypes.STRING,
    method: DataTypes.STRING(10),
    route: DataTypes.STRING(255),
    requestBody: DataTypes.TEXT,
    responseBody: DataTypes.TEXT,
    statusCode: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

export default Logs;
