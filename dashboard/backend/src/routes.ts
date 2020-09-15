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

// file upload
import fs from "fs";
import path from "path";
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
    if(req.body.type==="data"){
      cb(null, `${req.body.name}.csv`);
    }else if(req.body.type==="config"){
      cb(null, `${req.body.name}.json`);
    }
  }
});
const upload = multer({ storage: storage });

// route handler
export default function(app: any){
  router.get("/test", function(req,res){res.json("Hello World!");});

  router.post("/uploaddata",  upload.single("file"),function(req, res, next){
    res.status(201).send({ message: "Data Uploaded" });
  });

  router.post("/uploadconfig", function(req, res, next){
    const dir = path.join(__dirname, "/public/map/config/");
    if (!fs.existsSync(dir)) {fs.mkdirSync(dir,{recursive: true});}
    const file=dir+req.body.name+".json";
    if(fs.existsSync(file)){
        fs.unlink(file, (err) => {
        if (err) {
          console.error(err);
          return;}});
    }
    fs.writeFile(file, JSON.stringify(req.body.file), 
    function(err){if(err)console.error(err);return;}
    );
    res.status(201).send({ message: "Config Uploaded" });
  });

  router.get("/deletedata", function(req, res, next){
    const file = path.join(__dirname, "/public/map/data/"+req.query.name);
    fs.unlink(file, (err) => {
      if (err) {
        console.error(err);
        return;}});
    res.status(201).send({ message: "Data Deleted" });
  });

  router.get("/getdatalist", function(req,res){
      //passsing directoryPath and callback function
    const dir = path.join(__dirname, "/public/map/data/");
    if(!fs.existsSync(dir)){
      res.json([]);
    }
    fs.readdir(dir, function (err, files) {
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



