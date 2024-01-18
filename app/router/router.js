const express = require("express")
const routerLivres = express.Router()

const controllers = require("../controller/controller")

routerLivres.get("/boutiques", (req, res) => {
    controllers.getBoutiques(req, res)
})

routerLivres.get("/boutiques/:userId", (req, res) => {
    controllers.getBoutiquesByUserId(req, res)
})

routerLivres.get("/:boutique/produits", (req, res) => {
    controllers.getProduits(req, res)
})

routerLivres.get("/:produit", (req, res) => {
    controllers.getProduitById(req, res)
})

routerLivres.post("/livres", (req, res) => {
    controllers.addLivre(req, res)
})

routerLivres.delete("/livres/:numlivre", (req, res) => {
    controllers.removeLivre(req, res)
})

routerLivres.put("/livres/:numlivre", (req, res) => {
    controllers.editLivre(req, res)
})

module.exports = { routerLivres }