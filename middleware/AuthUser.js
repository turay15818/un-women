import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account!" });
  }
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  req.user = user;
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (user.role !== "Admin")
    return res.status(403).json({ msg: "Access forbidden" });
  next();
};
export const superAdminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (user.role !== "SuperAdmin")
    return res.status(403).json({ msg: "Access forbidden" });
  next();
};
export const vendorOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (user.role !== "Vendor")
    return res.status(403).json({ msg: "Access forbidden" });
  next();
};
export const customerOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (user.role !== "Customer")
    return res.status(403).json({ msg: "Access forbidden" });
  next();
};
export const mentorOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (user.role !== "Mentor")
    return res.status(403).json({ msg: "Access forbidden" });
  next();
};
