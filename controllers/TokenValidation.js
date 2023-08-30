import Token from "../models/Token.js";

export const validateToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const dbToken = await Token.findOne({
    where: { token: token, revoked: false },
  });

  if (!dbToken) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};
