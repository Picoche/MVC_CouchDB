const express = require("express")
const routerLivres = express.Router()

const controllers = require("../controller/controller")

routerLivres.get("/livres", (req, res) => {
    controllers.getLivres(req, res)
})

routerLivres.get("/livres/:numlivre", (req, res) => {
    controllers.getLivreById(req, res)
})

routerLivres.get("/livres/:numlivre/pages", (req, res) => {
    controllers.getPages(req, res)
})

routerLivres.get("/livres/:numlivre/pages/:numpage", (req, res) => {
    controllers.getPageById(req, res)
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