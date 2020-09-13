import passport from "passport";
import express from "express";
const router = express.Router();

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";

import path from "path";
import fs from "fs";
//static directory 
const directoryPath = path.join(__dirname, "public/fonts");

// file upload
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir="/public/data/";
    if (!fs.existsSync(dir)) {fs.mkdirSync(dir),{recursive: true};}
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, "abcde" + path.extname(file.originalname)); //Appending extension
  }
});
const upload = multer({ storage: storage });

export default function(app: any){
  router.get("/test", function(req,res){
  //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          return console.log("Unable to scan directory: " + err);
      } 
      //listing all files using forEach
      files.forEach(function (file) {
          // Do whatever you want to do with the file
          console.log(file); 
      });
  });
    res.json("Hello World!");});

  router.post("/uploaddata",  upload.single("avatar"),function(req, res, next){
    console.log(req.body);
    res.status(201).send({ message: "Data Uploaded" });
  } 
  );
  router.post("/uploadconfig", upload.single("avatar"), function(req, res, next){
    res.status(201).send({ message: "Image uploaded" });
  } 
  );

    /**
     * Primary app routes.
     */
    router.get("/", homeController.index);
    router.get("/login", userController.getLogin);
    router.post("/login", userController.postLogin);
    router.get("/logout", userController.logout);
    router.get("/forgot", userController.getForgot);
    router.post("/forgot", userController.postForgot);
    router.get("/reset/:token", userController.getReset);
    router.post("/reset/:token", userController.postReset);
    router.get("/signup", userController.getSignup);
    router.post("/signup", userController.postSignup);
    router.get("/contact", contactController.getContact);
    router.post("/contact", contactController.postContact);
    router.get("/account", passportConfig.isAuthenticated, userController.getAccount);
    router.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
    router.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
    router.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
    router.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

    /**
     * API examples routes.
     */
    router.get("/api", apiController.getApi);
    router.get("/api/facebook", passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);

    /**
     * OAuth authentication routes. (Sign in)
     */
    router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
    router.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
        res.redirect(req.session.returnTo || "/");
    });

  app.use("/", router);
}



