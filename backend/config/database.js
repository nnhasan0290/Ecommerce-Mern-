const mongoose = require("mongoose");
const Db_url = process.env.DB_URL;
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server:`);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDatabase;
