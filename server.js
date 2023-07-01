import express from "express";
import { APP_PORT, DB_URL } from "./config";
import router from "./routes";
import errorHandler from "./middlewares/errorHandler";
import mongoose from "mongoose";
const app = express();

// Database connection
mongoose.connect(DB_URL, {});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log("error connecting db");
});
db.once("open", () => {
  console.log("DB connected...");
});

app.use(express.json());
app.use("/api", router);

app.use(errorHandler);
app.listen(APP_PORT, () => console.log(`Listening on Port ${APP_PORT}.`));
