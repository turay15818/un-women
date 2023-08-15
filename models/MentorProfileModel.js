import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
const MentorProfile = db.define(
  "mentorProfile",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    education: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    languages: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availability: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkedinProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    noOfMentee: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notEmpty: true,
      },
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    CreatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    UpdatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    DeletedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    DateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      validate: {
        notEmpty: true,
      },
    },
    DateUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    DateDeleted: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
    DeletedReason: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(MentorProfile);
MentorProfile.belongsTo(Users, { foreignKey: "userId" });

export default MentorProfile;
