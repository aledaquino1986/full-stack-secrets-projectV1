const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  appKey: process.env.APP_KEY,
  appurl: process.env.APP_URL,
  appPort: process.env.APP_PORT
};
