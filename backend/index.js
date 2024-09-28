const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
(async () => {
  await mongoose.connect(process.env.DB);
  console.log("database connected");
})();

const App = require("./app");

App.listen(process.env.PORT, () => console.log("listening"));

// we install mongoose and dotenv
// we set the path of all configuration file with dotenv.
//created the user schema , install validator, use validator
