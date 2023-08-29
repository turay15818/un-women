import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import fileUpload from "express-fileupload";
import path from "path";
import ProductImageRoute from "./routes/ProductImageRoute.js";
import BusinessProfileRoute from "./routes/BusinessProfileRoute.js";
import MentorProfileRoute from "./routes/MentorProfileRoute.js";
import { __dirname } from "./dirname.js";
import NewsLetter from "./models/NewsLetterModel.js";
import NewsLetterRoute from "./routes/NewsLetterRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(fileUpload());
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(MentorProfileRoute);
app.use(BusinessProfileRoute);
app.use(ProductRoute);
app.use(ProductImageRoute);
app.use(AuthRoute);
app.use(NewsLetterRoute);

// store.sync();
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server up and running...${port}`);
});
