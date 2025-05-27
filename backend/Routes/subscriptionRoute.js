const express = require("express");
const { protect } = require("../Controllers/authController");
const {
  freeSubscription,
  createOrUpdateSubscription,
} = require("../Controllers/subscriptionController");
const Router = express.Router();

Router.use(protect);
Router.post("/stripe/subscribe", createOrUpdateSubscription);
Router.get("/free-plan", freeSubscription);

module.exports = Router;
