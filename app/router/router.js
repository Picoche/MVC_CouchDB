const express = require("express");
const routerLivres = express.Router();

const controllers = require("../controller/controller");

routerLivres.get("/boutiques", (req, res) => {
  controllers.getBoutiques(req, res);
});

routerLivres.get("/boutiques/:userId", (req, res) => {
  controllers.getBoutiquesByUserId(req, res);
});

routerLivres.get("/:boutique/produits", (req, res) => {
  controllers.getProduits(req, res);
});

routerLivres.get("/:boutique/produits/:produit", (req, res) => {
  controllers.getProduitById(req, res);
});

routerLivres.post("/boutique", (req, res) => {
  controllers.addBoutique(req, res);
});

routerLivres.post("/:boutique/produits/addProduit", (req, res) => {
  controllers.addProduit(req, res);
});

routerLivres.delete("/boutiques/:boutique", (req, res) => {
  controllers.removeBoutique(req, res);
});

routerLivres.delete("/produits/:produit", (req, res) => {
  controllers.removeBoutique(req, res);
});

routerLivres.put("/boutiques/:boutique", (req, res) => {
  controllers.editBoutique(req, res);
});

routerLivres.put("/produits/:produit", (req, res) => {
  controllers.editProduit(req, res);
});

module.exports = { routerLivres };
