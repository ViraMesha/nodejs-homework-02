const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
// body parser middleware
app.use(express.json()); // перевіряє, чи є в запиті тіло і який у нього тип по заголовку content-type. Якщо заголовок application/json, то ця middleware бере строку, яку передають, і за допоиогою JSON.parse перетворює її на об'єкт.

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
