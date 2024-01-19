const express = require("express");
const routerProduit = express.Router();

const controllers = require("../controller/controllerproduit");

routerProduit.get("/:boutique/produits", (req, res) => {
    controllers.getProduits(req, res);
  });
  
routerProduit.get("/:boutique/produits/:produit", (req, res) => {
    controllers.getProduitById(req, res);
  });

  routerProduit.post("/:boutique/produits/addProduit", (req, res) => {
    controllers.addProduit(req, res);
  });

  routerProduit.delete("/produits/:produit", (req, res) => {
    controllers.removeProduit(req, res);
  });

  routerProduit.put("/produits/:produit", (req, res) => {
    controllers.editProduit(req, res);
  });
  
  module.exports = { routerProduit };