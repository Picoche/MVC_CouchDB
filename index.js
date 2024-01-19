const express = require("express");
const app = express();

app.use(express.json())

const { routerBoutique} = require("./app/router/routerboutique")
const { routerProduit} = require("./app/router/routerproduit")
const { routerUser} = require("./app/router/routeruser")

app.use(routerBoutique);
app.use(routerProduit);
app.use(routerUser);

app.listen(3000, () => {
  console.log("Server started");
});
