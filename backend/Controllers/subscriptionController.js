const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Subscription = require("../Models/Subscription");
const Users = require("../Models/users");
const { catchAsync, AppError } = require("../utils/catchAsync");

const createOrUpdateSubscription = catchAsync(async (req, res, next) => {
  const { token, plan } = req.body;
  const userId = req.user.id;

  const planId = {
    premium: process.env.PREMIUM_PRICE_COST, // Ensure this is the correct Price ID
  }[plan];

  // Create and attach payment method
  const paymentMethod = await stripe.paymentMethods.create({
    type: "card",
    card: { token },
  });

  await stripe.paymentMethods.attach(paymentMethod.id, {
    customer: req.user.stripeCustomerId,
  });

  // Find existing subscription
  const existingSubscription = await Subscription.findOne({ userId });
  if (existingSubscription)
    await Subscription.findByIdAndDelete(existingSubscription._id);

  // Create a new subscription
  let subscriptionRecord;
  let newSubscription;
  try {
    newSubscription = await stripe.subscriptions.create({
      customer: req.user.stripeCustomerId,
      items: [{ price: planId }],
      default_payment_method: paymentMethod.id,
    });

    subscriptionRecord = new Subscription({
      userId,
      stripeSubscriptionId: newSubscription.id,
      plan,
      status: newSubscription.status,
      paymentMethod: paymentMethod.id,
    });
    await subscriptionRecord.save();
  } catch (error) {
    return next(
      new AppError(`Error creating subscription: ${error.message}`, 500)
    );
  }

  // Update user record
  console.log(subscriptionRecord);

  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    {
      isSubscribed: true,
      subscriptionExpires: new Date(newSubscription.current_period_end * 1000),
      subscriptionDetails: subscriptionRecord.id,
    },
    { new: true }
  );

  // Populate subscription details
  const populatedUser = await Users.populate(updatedUser, {
    path: "subscriptionDetails",
    model: "Subscription",
  });

  res.json({
    status: "success",
    message: "Subscribed successfully",
    user: populatedUser,
  });
});
const freeSubscription = catchAsync(async (req, res, next) => {
  const user = req.user;

  // Find existing subscription
  let subscription = await Subscription.findOne({ userId: user.id });

  if (subscription) {
    // Update existing subscription
    await Subscription.findByIdAndUpdate(subscription._id, {
      stripeSubscriptionId: subscription?.stripeSubscriptionId,
      plan: "free",
      status: "Active",
      paymentMethod: "free",
    });
  } else {
    // Create a new subscription
    subscription = new Subscription({
      userId: user.id,
      plan: "free",
      status: "Active",
      paymentMethod: "free",
    });
    await subscription.save();
  }

  // Update the user record
  const updatedUser = await Users.findByIdAndUpdate(
    user.id,
    {
      isSubscribed: true,
      subscriptionExpires: null,
      subscriptionDetails: subscription._id,
    },
    { new: true }
  );

  // Populate the subscription details in the user object
  const populatedUser = await Users.populate(updatedUser, {
    path: "subscriptionDetails",
    model: "Subscription",
  });

  res.json({
    status: "success",
    message: "Subscribed successfully",
    user: populatedUser,
  });
});

module.exports = {
  createOrUpdateSubscription,
  freeSubscription,
};
// 4242 4242 4242 4242
