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

// file upload
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir=__dirname+"/public/map/";
    if(req.body.type==="data"){
      dir=dir+"data/";
    }else if(req.body.type==="config"){
      dir=dir+"config/";
    }
    if (!fs.existsSync(dir)) {fs.mkdirSync(dir,{recursive: true});}
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.name}.csv`);
  }
});
const upload = multer({ storage: storage });

// route handler
export default function(app: any){
  router.get("/test", function(req,res){res.json("Hello World!");});

  router.post("/uploaddata",  upload.single("file"),function(req, res, next){
    res.status(201).send({ message: "Data Uploaded" });
  } 
  );

  router.post("/uploadconfig", upload.single("file"), function(req, res, next){
    const dir = path.join(__dirname, "/public/map/config/");
    if (!fs.existsSync(dir)) {fs.mkdirSync(dir,{recursive: true});}
    fs.writeFile(dir+req.body.name+".json", JSON.stringify(req.body.file), 
    function(error){if(error)throw error;}
    );
    res.status(201).send({ message: "Config Uploaded" });
  } 
  );

  router.get("/getdatalist", function(req,res){
      //passsing directoryPath and callback function
    const directoryPath = path.join(__dirname, "/public/map/data/");
    if(!fs.existsSync(directoryPath)){
      res.json({});
    }
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          return console.log("Unable to scan directory: " + err);
      } 
      const names: Array<string>=[];
      //listing all files using forEach
      files.forEach(function (file) {
          // Do whatever you want to do with the file
          names.push(file);
      });
      res.json(names);
  });});

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



