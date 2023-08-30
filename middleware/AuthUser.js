import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyUser = async (req, res, next) => {
  console.log("Received Authorization Header:", req.headers.authorization);

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    console.log("Token not found in header");
    return res.status(401).json({ msg: "Please login to your account!" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findOne({
      where: {
        uuid: decodedToken.uuid,
      },
    });

    if (!user) {
      console.log("User not found in database");
      return res.status(404).json({ msg: "User not found" });
    }

    req.userId = user.id;
    req.role = user.role;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export const adminOnly = async (req, res, next) => {
  if (req.role !== "Admin") {
    return res.status(403).json({ msg: "Access forbidden" });
  }
  next();
};

export const superAdminOnly = async (req, res, next) => {
  if (req.role !== "SuperAdmin") {
    return res.status(403).json({ msg: "Access forbidden" });
  }
  next();
};

export const vendorOnly = async (req, res, next) => {
  if (req.role !== "Vendor") {
    return res.status(403).json({ msg: "Access forbidden" });
  }
  next();
};

export const customerOnly = async (req, res, next) => {
  if (req.role !== "Customer") {
    return res.status(403).json({ msg: "Access forbidden" });
  }
  next();
};

export const mentorOnly = async (req, res, next) => {
  if (req.role !== "Mentor") {
    return res.status(403).json({ msg: "Access forbidden" });
  }
  next();
};
