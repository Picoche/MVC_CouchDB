const nano = require("nano")("https://couchdb-fabien-hombert.alwaysdata.net:6984");

const db = nano.db.use("fabien-hombert_boutique")
const dbProduits = nano.db.use("fabien-hombert_produits")

exports.getBoutiques = async (req, res) => {
    const query = {
        selector: {},
        fields: []
    }
    const boutiques = await db.find(query)
    res.json(boutiques.docs)
}

exports.getBoutiquesByUserId = async (req, res) => {
    const query = {
        selector: { "commercantId": req.params.userId },
        fields: []
    }
    const boutique = await db.find(query)

    if (!boutique) {
        res.status(404).json("Ce commerçant ne possède pas de boutiques.")
    } else {
        res.json(boutique.docs)
    }
}

exports.getProduits = async (req, res) => {
    const query = {
        selector: { "_id": req.params.boutique },
        fields: ["produits"]
    }
    const produits = await db.find(query)

    if (!produits) {
        res.status(404).json("Aucun produit trouvé pour cette boutique.")
    } else {
        res.json(produits.docs)
    }
}

exports.getProduitById = async (req, res) => {
    const query = {
        selector: { "_id": req.params.produit },
        fields: []
    }
    
    const produit = await dbProduits.find(query)

    if (!produit) {
        res.status(404).json("Produit introuvable.")
    } else {
        console.log(query)
        console.log(produit)
        res.json(produit.docs)
    }
}

exports.addLivre = async (req, res, livreAddSchema) => {
    const livre = {
        numero: req.body.numero,
        titre: req.body.titre,
        pages: req.body.pages
    }
    const { value, error } = livreAddSchema.validate(livre)
    if (error === undefined) {
        await db.insert(livre)
        res.status(200).json("Livre ajouté avec succès.")
    } else {
        res.json(`Erreur lors de la suppression : ${error}`)
    }
}

exports.removeLivre = async (req, res) => {
    const query = {
        selector: { "numero": parseInt(req.params.numlivre) },
        fields: ["_id", "_rev"]
    }
    const livre = await db.find(query)

    if (!livre) {
        res.status(404).json("Livre non trouvé.")
    } else {
        await db.destroy(livre.docs[0]._id, livre.docs[0]._rev)
        res.status(200).json("Livre supprimé avec succès.")
    }
}

exports.editLivre = async (req, res, livreEditSchema) => {
    const query = {
        selector: { "numero": parseInt(req.params.numlivre) },
        fields: ["_id", "_rev"]
    }
    const livreToUpdate = await db.find(query)

    if (!livreToUpdate) {
        res.status(404).json("Livre non trouvé.")
    } else {
        const livre = {
            _id: livreToUpdate.docs[0]._id,
            _rev: livreToUpdate.docs[0]._rev,
            numero: req.body.numero,
            titre: req.body.titre,
            pages: req.body.pages
        }

        const { value, error } = livreEditSchema.validate(livre)
        if (error === undefined) {
            await db.insert(livre)
            res.status(200).json("Livre modifié avec succès.")
        } else {
            res.json(`Erreur lors de la modification : ${error}`)
        }
    }
}