"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

// API
var uploaderAPI = require("./src/api/uploader");
var queueAPI = require("./src/api/queue");

// BASE SETUP
// =============================================================================
var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Enabling CORS Pre-Flight
app.options("*", cors(corsOptions));
app.use((0, cors)());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router.post("/uploads", uploaderAPI.onUpload);
router.delete("/upload/:uuid", uploaderAPI.onDeleteFile);

// router.get("/queue_stats", queueAPI.getTaskStats);

router.post("/job", queueAPI.onCreateJob);
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Server Working on port " + port);
