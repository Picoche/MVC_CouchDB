const express = require("express");
const routerBoutique = express.Router();

const controllers = require("../controller/controllerboutique");

routerBoutique.get("/boutiques", (req, res) => {
  controllers.getBoutiques(req, res);
});

routerBoutique.get("/boutiques/:userId", (req, res) => {
  controllers.getBoutiquesByUserId(req, res);
});

routerBoutique.post("/boutique", (req, res) => {
  controllers.addBoutique(req, res);
});

routerBoutique.delete("/boutiques/:boutique", (req, res) => {
  controllers.removeBoutique(req, res);
});

routerBoutique.put("/boutiques/:boutique", (req, res) => {
  controllers.editBoutique(req, res);
});


module.exports = { routerBoutique };
