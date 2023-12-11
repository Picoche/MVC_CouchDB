const express = require("express");
const app = express();

app.use(express.json())

const { routerLivres } = require("./app/router/router")

app.use(routerLivres);

app.listen(3000, () => {
  console.log("Server started");
});
