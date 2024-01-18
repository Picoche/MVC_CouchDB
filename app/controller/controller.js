const models = require("../model/model")
const Joi = require("joi")

const livreAddSchema = Joi.object({
    numero: Joi.number().required(),
    titre: Joi.string().required(),
    pages: Joi.array().required()
})

const livreEditSchema = Joi.object({
    _id: Joi.string().required(),
    _rev: Joi.string().required(),
    numero: Joi.number(),
    titre: Joi.string(),
    pages: Joi.array()
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

exports.addLivre = (req, res) => {
    return models.addLivre(req, res, livreAddSchema)
}

exports.removeLivre = (req, res) => {
    return models.removeLivre(req, res)
}

exports.editLivre = (req, res) => {
    return models.editLivre(req, res, livreEditSchema)
}