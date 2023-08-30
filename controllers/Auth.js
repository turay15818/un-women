import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import FailedLoginAttempt from "../models/FailedLoginAttempt.js";
import jwt from "jsonwebtoken";
import Token from "../models/Token.js";
import dotenv from "dotenv";

dotenv.config();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_IN_MINUTES = 30;

// export const Logins = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ msg: "Email does not exist" });
//     }

//     if (!user.Active) {
//       return res.status(401).json({
//         msg: "Your account is disabled. Please contact your administrator.",
//       });
//     }

//     const comparePassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!comparePassword) {
//       let failedLogin = await FailedLoginAttempt.findOne({
//         where: { user_id: user.id },
//       });
//       if (!failedLogin) {
//         failedLogin = await FailedLoginAttempt.create({
//           user_id: user.id,
//           attempts: 1,
//         });
//       } else {
//         failedLogin.attempts++;
//         failedLogin.last_attempt_time = new Date();
//         await failedLogin.save();
//       }

//       if (failedLogin.attempts >= MAX_LOGIN_ATTEMPTS) {
//         const lockTime = new Date(
//           failedLogin.last_attempt_time.getTime() +
//             LOCK_TIME_IN_MINUTES * 5 * 1000
//         );
//         if (lockTime > new Date()) {
//           const remainingTimeInMinutes = Math.ceil(
//             (lockTime - new Date()) / (5 * 1000)
//           );
//           return res.status(401).json({
//             msg: `Your account is locked. Please try again in ${remainingTimeInMinutes} minute(s).`,
//           });
//         } else {
//           failedLogin.attempts = 0;
//           await failedLogin.save();
//         }
//       }

//       return res.status(404).json({ msg: "Password is not correct" });
//     }

//     const failedLogin = await FailedLoginAttempt.findOne({
//       where: { user_id: user.id },
//     });
//     if (failedLogin && failedLogin.attempts >= MAX_LOGIN_ATTEMPTS) {
//       const lockTime = new Date(
//         failedLogin.last_attempt_time.getTime() +
//           LOCK_TIME_IN_MINUTES * 5 * 1000
//       );
//       if (lockTime > new Date()) {
//         const remainingTimeInMinutes = Math.ceil(
//           (lockTime - new Date()) / (5 * 1000)
//         );
//         return res.status(401).json({
//           msg: `Your account is locked. Please try again in ${remainingTimeInMinutes} minute(s).`,
//         });
//       } else {
//         failedLogin.attempts = 0;
//         await failedLogin.save();
//       }
//     }
//     if (failedLogin) {
//       failedLogin.attempts = 0;
//       await failedLogin.save();
//     }

//     req.session.userId = user.uuid;
//     const uuid = user.uuid;
//     const id = user.id;
//     const name = user.name;
//     const email = user.email;
//     const role = user.role;
//     const phoneNo = user.phoneNo;
//     const homeAddress = user.homeAddress;
//     const url = user.url;

//     res
//       .status(200)
//       .json({ uuid, id, url, name, email, phoneNo, homeAddress, role });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Internal server error" });
//   }
// };

// export const Me = async (req, res) => {
//   if (!req.session.userId) {
//     return res.status(200).json({ msg: "Please login to your account!" });
//   }
//   const user = await User.findOne({
//     attributes: ["id", "url", "name", "email", "phoneNo", "homeAddress", "role"],
//     where: {
//       id: req.session.userId,
//     },
//   });

//   if (!user) return res.status(404).json({ msg: "User not found" });
//   res.status(200).json(user);
// };

export const Me = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).json(decodedToken);
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Can't log out" });
    res.status(200).json({ msg: "You have logged out" });
  });
};

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Email does not exist" });
    }

    if (!user.Active) {
      return res.status(401).json({
        msg: "Your account is disabled. Please contact your administrator.",
      });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      let failedLogin = await FailedLoginAttempt.findOne({
        where: { user_id: user.id },
      });
      if (!failedLogin) {
        failedLogin = await FailedLoginAttempt.create({
          user_id: user.id,
          attempts: 1,
        });
      } else {
        failedLogin.attempts++;
        failedLogin.last_attempt_time = new Date();
        await failedLogin.save();
      }

      if (failedLogin.attempts >= MAX_LOGIN_ATTEMPTS) {
        const lockTime = new Date(
          failedLogin.last_attempt_time.getTime() +
            LOCK_TIME_IN_MINUTES * 5 * 1000
        );
        if (lockTime > new Date()) {
          const remainingTimeInMinutes = Math.ceil(
            (lockTime - new Date()) / (5 * 1000)
          );
          return res.status(401).json({
            msg: `Your account is locked. Please try again in ${remainingTimeInMinutes} minute(s).`,
          });
        } else {
          failedLogin.attempts = 0;
          await failedLogin.save();
        }
      }

      return res.status(404).json({ msg: "Password is not correct" });
    }
    const failedLogin = await FailedLoginAttempt.findOne({
      where: { user_id: user.id },
    });
    if (failedLogin && failedLogin.attempts >= MAX_LOGIN_ATTEMPTS) {
      const lockTime = new Date(
        failedLogin.last_attempt_time.getTime() +
          LOCK_TIME_IN_MINUTES * 5 * 1000
      );
      if (lockTime > new Date()) {
        const remainingTimeInMinutes = Math.ceil(
          (lockTime - new Date()) / (5 * 1000)
        );
        return res.status(401).json({
          msg: `Your account is locked. Please try again in ${remainingTimeInMinutes} minute(s).`,
        });
      } else {
        failedLogin.attempts = 0;
        await failedLogin.save();
      }
    }
    if (failedLogin) {
      failedLogin.attempts = 0;
      await failedLogin.save();
    }
    // Create a JWT token
    const token = jwt.sign(
      {
        uuid: user.uuid,
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        phoneNo: user.phoneNo,
        url: user.url,
        homeAddress: user.homeAddress,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      },
      process.env.SECRET_KEY
    );

    await Token.create({
      user_id: user.id,
      token: token,
      expiration: new Date().getTime() + 3600000,
    });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const Logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await Token.update({ revoked: true }, { where: { token: token } });
    res.status(200).json({ msg: "Token revoked" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
