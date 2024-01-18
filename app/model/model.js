const nano = require("nano")("https://couchdb-fabien-hombert.alwaysdata.net:6984");

const db = nano.db.use("fabien-hombert_boutique")

exports.getBoutiques = async (req, res) => {
    const query = {
        selector: {},
        fields: []
    }
    const boutiques = await db.find(query)
    res.json(boutiques.docs)
}

exports.getBoutiquesByUserId = async (req, res) => {
    console.log(req.params)
    const query = {
        selector: {"commercantId": req.params.userId},
        fields: []
    }
    const boutique = await db.find(query)

    if(!boutique) {
        res.status(404).json("Ce commerçant ne possède pas de boutiques.")
    } else {
        res.json(boutique.docs)
    }
}

exports.getPages = async (req, res) => {
    const query = {
        selector: {"numero": parseInt(req.params.numlivre)},
        fields: ["pages"]
    }
    const livre = await db.find(query)

    if(!livre) {
        res.status(404).json("Livre non trouvé.")
    } else {
        res.json(livre.docs)
    }
}

exports.getPageById = async (req, res) => {
    const query = {
        selector: { "numero": parseInt(req.params.numlivre) },
        fields: ["pages"]
    }
    const livre = await db.find(query)

    if(!livre) {
        res.status(404).json("Livre non trouvé.")
    } else if(!livre.docs[0].pages[req.params.numpage]) {
        res.status(404).json("Cette page du livre n'existe pas.")
    } else {
        res.json(livre.docs[0].pages[req.params.numpage])
    }
}

exports.addLivre = async (req, res, livreAddSchema) => {
    const livre = {
        numero: req.body.numero,
        titre: req.body.titre,
        pages: req.body.pages
    }
    const { value, error } = livreAddSchema.validate(livre)
    if(error === undefined) {
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

    if(!livre) {
        res.status(404).json("Livre non trouvé.")
    } else {
        await db.destroy(livre.docs[0]._id, livre.docs[0]._rev)
        res.status(200).json("Livre supprimé avec succès.")
    }
}

exports.editLivre = async (req, res, livreEditSchema) => {
    const query = {
        selector: { "numero": parseInt(req.params.numlivre)},
        fields: ["_id", "_rev"]
    }
    const livreToUpdate = await db.find(query)

    if(!livreToUpdate) {
        res.status(404).json("Livre non trouvé.")
    } else {
        const livre = {
            _id: livreToUpdate.docs[0]._id,
            _rev: livreToUpdate.docs[0]._rev,
            numero: req.body.numero,
            titre: req.body.titre,
            pages: req.body.pages
        }

        const { value, error} = livreEditSchema.validate(livre)
        if(error === undefined) {
            await db.insert(livre)
            res.status(200).json("Livre modifié avec succès.")
        } else {
            res.json(`Erreur lors de la modification : ${error}`)
        }
    }
}