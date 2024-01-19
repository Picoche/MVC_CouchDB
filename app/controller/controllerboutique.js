const models = require("../model/modelboutique");
const Joi = require("joi");

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
});

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
});

exports.getBoutiques = (req, res) => {
  return models.getBoutiques(req, res);
};

exports.getBoutiquesByUserId = (req, res) => {
  return models.getBoutiquesByUserId(req, res);
};

exports.addBoutique = (req, res) => {
  return models.addBoutique(req, res, boutiqueAddSchema);
};

exports.removeBoutique = (req, res) => {
  return models.removeBoutique(req, res);
};

exports.editBoutique = (req, res) => {
  return models.editBoutique(req, res, boutiqueEditSchema);
};

