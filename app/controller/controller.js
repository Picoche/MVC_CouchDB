const models = require("../model/model")
const Joi = require("joi")

const boutiqueAddSchema = Joi.object({
    commercantId: Joi.string().required(),
    adresse: Joi.string().required(),
    nbOfRating: Joi.number().required(),
    nom: Joi.string().required(),
    numTel: Joi.string().required(),
    openDays: Joi.string().required(),
    rating: Joi.number().required(),
    produits: Joi.array().required(),
    categorieId: Joi.string().required(),
})

const produitAddSchema = Joi.object({
    boutiqueId: Joi.string().required(),
    nbOfRating: Joi.number().required(),
    nom: Joi.string().required(),
    prix: Joi.number().required(),
    quantite: Joi.number().required(),
    rating: Joi.number().required(),
})

const boutiqueEditSchema = Joi.object({
    _id: Joi.string().required(),
    _rev: Joi.string().required(),
    commercantId: Joi.string(),
    adresse: Joi.string(),
    nbOfRating: Joi.number(),
    nom: Joi.string(),
    numTel: Joi.string(),
    openDays: Joi.string(),
    rating: Joi.number(),
    produits: Joi.array(),
    categorieId: Joi.string(),
})

const produitEditSchema = Joi.object({
    _id: Joi.string().required(),
    _rev: Joi.string().required(),
    boutiqueId: Joi.string(),
    nbOfRating: Joi.number(),
    nom: Joi.string(),
    prix: Joi.number(),
    quantite: Joi.number(),
    rating: Joi.number(),
})

exports.getBoutiques = (req, res) => {
    return models.getBoutiques(req, res)
}

exports.getBoutiquesByUserId = (req, res) => {
    return models.getBoutiquesByUserId(req, res)
}

exports.getProduits = (req, res) => {
    return models.getProduits(req, res)
}

exports.getProduitById = (req, res) => {
    return models.getProduitById(req, res)
}

exports.addBoutique = (req, res) => {
    return models.addBoutique(req, res, boutiqueAddSchema)
}

exports.addProduit = (req, res) => {
    return models.addProduit(req, res, produitAddSchema)
}

exports.removeBoutique = (req, res) => {
    return models.removeBoutique(req, res)
}

exports.removeProduit= (req, res) => {
    return models.removeProduit(req, res)
}

exports.editBoutique = (req, res) => {
    return models.editBoutique(req, res, boutiqueEditSchema)
}

exports.editProduit = (req, res) => {
    return models.editProduit(req, res, produitEditSchema)
}