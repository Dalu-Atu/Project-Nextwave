const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
    required: [true, "Please provide a valid email"],
    validate: [validator.isEmail, "Please provide a valid email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "password must be at least 8 characters"],
    // select: false, // Don't return password by default
  },
  stripeCustomerId: {
    type: String,
    required: false, // Optional if you want to add this to existing users later
  },

  passwordChangedAt: Date,
  isSubscribed: { type: Boolean, default: false },
  subscriptionExpires: { type: Date, default: null },
  subscriptionDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  watchlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MoviesCollection" },
  ],
});

UserSchema.methods.isPasswordChanged = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000; // Set passwordChangedAt 1 second in the past
  next();
});

UserSchema.methods.validatePassword = async (
  userPassword,
  providedPassword
) => {
  return await bcrypt.compare(providedPassword, userPassword);
};

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
