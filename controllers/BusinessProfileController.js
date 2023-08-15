import BusinessProfile from "../models/BusinessProfileModel.js";
import path from "path";
import Users from "../models/UserModel.js";
import fs from "fs";
import { Sequelize } from "sequelize";


export const getBusinessProfile = async (req, res) => {
  try {
    const response = await BusinessProfile.findAll({
      where: {
        Active: true,
        Deleted: false,
      },
      include: {
        model: Users,
        attributes: ["name", "email", "role"],
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBusinessProfileById = async (req, res) => {
  try {
    const response = await BusinessProfile.findOne({
      where: {
        uuid: req.params.id,
        Active: true,
        Deleted: false,
      },
      include: {
        model: Users,
      },
    });

    if (!response) {
      return res.status(404).json({ msg: "Business Profile not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBusinessProfile = async (req, res) => {
  try {
    if (!req.files || !req.files.logo || !req.files.certificate)
      return res
        .status(400)
        .json({ msg: "Logo and Certificate images are required" });

    const {
      businessSize,
      tagLine,
      businessName,
      businessAddress,
      businessBiography,
      businessCategory,
    } = req.body;

    const CreatedBy = req.user.name;
    const userId = req.user.id;

    const logoFile = req.files.logo;
    const logoFileSize = logoFile.data.length;
    const logoExt = path.extname(logoFile.name);
    const logoFileName = logoFile.md5 + logoExt;
    const businessLogo = `${req.protocol}://${req.get(
      "host"
    )}/images/${logoFileName}`;

    const certificateFile = req.files.certificate;
    const certificateFileSize = certificateFile.data.length;
    const certificateExt = path.extname(certificateFile.name);
    const certificateFileName = certificateFile.md5 + certificateExt;
    const registredCertificate = `${req.protocol}://${req.get(
      "host"
    )}/images/${certificateFileName}`;

    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (
      !allowedTypes.includes(logoExt.toLowerCase()) ||
      !allowedTypes.includes(certificateExt.toLowerCase())
    )
      return res.status(422).json({ msg: "Invalid image format" });

    if (logoFileSize > 5000000 || certificateFileSize > 5000000)
      return res.status(422).json({ msg: "Image size exceeds 5 MB" });

    logoFile.mv(`./public/images/${logoFileName}`);
    certificateFile.mv(`./public/images/${certificateFileName}`);

    try {
      await BusinessProfile.create({
        userId: req.user.id,
        businessName: businessName,
        tagLine: tagLine,
        businessSize: businessSize,
        businessAddress: businessAddress,
        businessBiography: businessBiography,
        businessCategory: businessCategory,
        businessLogo: businessLogo,
        registredCertificate: registredCertificate,
        CreatedBy: CreatedBy,
      });

      res.status(201).json({ msg: "Business Profile created successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateBusinessProfile = async (req, res) => {
  try {
    const {
      businessSize,
      tagLine,
      businessName,
      businessAddress,
      businessBiography,
      businessCategory,
    } = req.body;

    const updatedBy = req.user.name;

    const businessProfile = await BusinessProfile.findOne({
      where: {
        userId: req.user.id,
        Active: true,
        Deleted: false,
      },
    });

    if (!businessProfile) {
      return res.status(404).json({ msg: "Business profile not found" });
    }

    const logoFile = req.files.logo;
    const logoFileSize = logoFile?.data.length || 0;
    const logoExt = path.extname(logoFile?.name || "");
    const logoFileName = logoFile?.md5 + logoExt;
    const businessLogo = logoFileName
      ? `${req.protocol}://${req.get("host")}/images/${logoFileName}`
      : businessProfile.businessLogo;

    const certificateFile = req.files.certificate;
    const certificateFileSize = certificateFile?.data.length || 0;
    const certificateExt = path.extname(certificateFile?.name || "");
    const certificateFileName = certificateFile?.md5 + certificateExt;
    const registredCertificate = certificateFileName
      ? `${req.protocol}://${req.get("host")}/images/${certificateFileName}`
      : businessProfile.registredCertificate;

    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (
      (logoFileName && !allowedTypes.includes(logoExt.toLowerCase())) ||
      (certificateFileName &&
        !allowedTypes.includes(certificateExt.toLowerCase()))
    ) {
      return res.status(422).json({ msg: "Invalid image format" });
    }

    if (
      (logoFileName && logoFileSize > 5000000) ||
      (certificateFileName && certificateFileSize > 5000000)
    ) {
      return res.status(422).json({ msg: "Image size exceeds 5 MB" });
    }

    if (logoFileName) {
      logoFile.mv(`./public/images/${logoFileName}`);
    }

    if (certificateFileName) {
      certificateFile.mv(`./public/images/${certificateFileName}`);
    }

    businessProfile.businessName = businessName;
    businessProfile.tagLine = tagLine;
    businessProfile.businessSize = businessSize;
    businessProfile.businessAddress = businessAddress;
    businessProfile.businessBiography = businessBiography;
    businessProfile.businessCategory = businessCategory;
    businessProfile.businessLogo = businessLogo;
    businessProfile.registredCertificate = registredCertificate;
    businessProfile.updatedBy = updatedBy;
    businessProfile.DateUpdated = Sequelize.literal("CURRENT_TIMESTAMP");
    await businessProfile.save();

    res.status(200).json({ msg: "Business Profile updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteBusinessProfile = async (req, res) => {
  const user = await BusinessProfile.findOne({
    where: {
      // uuid: req.params.id,
      userId: req.user.id,
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
    await BusinessProfile.update(
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
    res.status(200).json({ msg: "Business Profile Deleted" });
  } catch (error) {
    // Return an error response if there's an issue
    res.status(400).json({ msg: error.message });
  }
};
