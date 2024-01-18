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

exports.getBoutiqueByUserId = (req, res) => {
    return models.getBoutiqueByUserId(req, res)
}

exports.getPages = (req, res) => {
    return models.getPages(req, res)
}

exports.getPageById = (req, res) => {
    return models.getPageById(req, res)
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