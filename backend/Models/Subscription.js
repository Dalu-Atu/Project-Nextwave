const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Assuming you have a User model
    required: true,
  },
  stripeSubscriptionId: {
    type: String,
  },
  plan: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
