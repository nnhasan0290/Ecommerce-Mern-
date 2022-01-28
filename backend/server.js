const app = require("./app.js");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
dotenv.config({ path: "backend/config/config.env" });

//========== Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//============== Data base connection
connectDatabase();

const Port = process.env.PORT || 4000;
app.listen(Port, () => {
  console.log(`listening to port https://localhost:${Port}`);
});

//=======unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  ServiceWorkerRegistration.close(() => {
    process.exit(1);
  });
});
