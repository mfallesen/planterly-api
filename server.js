const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const COOKIESIGN = process.env.C;

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cookieParser(COOKIESIGN));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
console.log(process.env.C);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
