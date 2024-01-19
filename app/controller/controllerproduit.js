const models = require("../model/modelproduit");
const Joi = require("joi");

const produitAddSchema = Joi.object({
    boutiqueId: Joi.string(),
    nbOfRating: Joi.number().required(),
    nom: Joi.string().required(),
    prix: Joi.number().required(),
    quantite: Joi.number().required(),
    rating: Joi.number().required(),
  });

const produitEditSchema = Joi.object({
    _id: Joi.string().required(),
    _rev: Joi.string().required(),
    boutiqueId: Joi.string(),
    nbOfRating: Joi.number(),
    nom: Joi.string(),
    prix: Joi.number(),
    quantite: Joi.number(),
    rating: Joi.number(),
  });


exports.getProduits = (req, res) => {
    return models.getProduits(req, res);
  };
  
exports.getProduitById = (req, res) => {
    return models.getProduitById(req, res);
  };

exports.addProduit = (req, res) => {
    return models.addProduit(req, res, produitAddSchema);
  };

exports.removeProduit = (req, res) => {
    return models.removeProduit(req, res);
  };

exports.editProduit = (req, res) => {
    return models.editProduit(req, res, produitEditSchema);
  };
  