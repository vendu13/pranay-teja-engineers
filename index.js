import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
import multer from "multer";
import config from "./config.js";
import loadAuthorizeUser from "./utils/checkAuth.js";
import { checkPath, checkPathMain } from "./utils/checkPath.js";
import * as UserController from "./controllers/UserController.js";
import * as ProjectsController from "./controllers/ProjectsController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.imageFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

app.use(express.json());
app.use(cors());
app.use("/image", express.static(config.imageFolder));

app.post("/auth/login", UserController.login);
app.get("/auth/me", loadAuthorizeUser, UserController.getMe);

app.post("/contact", UserController.contactUs);

app.get("/messages", loadAuthorizeUser, UserController.sendMessages);
app.get("/projects", ProjectsController.sendProjects);

app.post(
  "/projects/delete",
  loadAuthorizeUser,
  ProjectsController.deleteProject
);
app.post(
  "/projects/create/gallery",
  loadAuthorizeUser,
  upload.array("images"),
  checkPath,
  ProjectsController.setGallery
);
app.post(
  "/projects/create/main",
  loadAuthorizeUser,
  upload.single("images"),
  checkPathMain,
  ProjectsController.setMain
);

mongoose
  .connect(config.dbUri)
  .then(() => {
    console.log("Connected to DB");
    app.listen(config.port, config.host);
  })
  .catch((err) => console.error(`${err} did not connect`));

app.listen(process.env.port || 6969);
