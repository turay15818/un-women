import User from "../models/UserModel.js";
import path from "path";
import { Sequelize } from "sequelize";
import fs from "fs";
import bcrypt from "bcrypt";
import BusinessProfile from "../models/BusinessProfileModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      where: {
        Active: true,
        Deleted: false,
      },
      include: {
        model: BusinessProfile,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        uuid: req.params.id,
        Active: true,
        Deleted: false,
      },
    });

    if (!response) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    if (!req.files || !req.files.file)
      return res.status(400).json({ msg: "No File Uploaded" });
    const { name, email, password, role, phoneNo, homeAddress, confPassword } =
      req.body;
    const CreatedBy = req.user.name;
    if (password !== confPassword)
      return res.status(400).json({ msg: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (!allowedTypes.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid image format" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image size exceeds 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: "File upload error" });

      try {
        await User.create({
          password: hashedPassword,
          name: name,
          email: email,
          homeAddress: homeAddress,
          phoneNo: phoneNo,
          role: role,
          url: url,
          CreatedBy: CreatedBy,
        });
        res.status(201).json({ msg: "User created successfully" });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, role, phoneNo, homeAddress, confPassword } =
      req.body;

    const user = await User.findOne({
      where: {
        uuid: req.params.id,
        Active: true,
        Deleted: false,
      },
    });

    if (!user) return res.status(404).json({ msg: "No Data Found" });
    if (password !== confPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const updatedBy = req.user.name;

    const hashedPassword = await bcrypt.hash(password, 10);

    let fileName = user.image;

    if (req.files !== null) {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Images" });
      }
      if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
      }

      const existingFilePath = `./public/images/${user.image}`;
      if (fs.existsSync(existingFilePath)) {
        fs.unlinkSync(existingFilePath);
      }

      file.mv(`./public/images/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
      });
    }

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    await User.update(
      {
        name: name,
        image: fileName,
        url: url,
        password: hashedPassword,
        email: email,
        homeAddress: homeAddress,
        phoneNo: phoneNo,
        role: role,
        updatedBy: updatedBy,
        DateUpdated: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );

    res.status(200).json({ msg: `${updatedBy} Updated Successfully` });
    console.log("This was update by:", updatedBy);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
      Active: true,
      Deleted: false,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  const DeletedReason = req.body.DeletedReason;
  const DeletedBy = req.user.name;

  try {
    await User.update(
      {
        Active: false,
        Deleted: true,
        DateDeleted: Sequelize.literal("CURRENT_TIMESTAMP"),
        DeletedReason: DeletedReason,
        DeletedBy: DeletedBy,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    // Return a response indicating success
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    // Return an error response if there's an issue
    res.status(400).json({ msg: error.message });
  }
};
