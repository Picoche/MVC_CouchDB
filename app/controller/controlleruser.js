const models = require("../model/modeluser");
const Joi = require("joi");

const userAddSchema = Joi.object({
  email: Joi.string().required(),
  hash: Joi.string().required(),
  estCommercant: Joi.boolean().required(),
  fullName: Joi.string().required(),
  profilePicture: Joi.string().required(),
  pseudo: Joi.string().required(),
  ownedShops: Joi.array().required(),
});


const userEditSchema = Joi.object({
  _id: Joi.string().required(),
  _rev: Joi.string().required(),
  email: Joi.string().required(),
  hash: Joi.string().required(),
  estCommercant: Joi.boolean().required(),
  fullName: Joi.string().required(),
  profilePicture: Joi.string().required(),
  pseudo: Joi.string().required(),
  ownedShops: Joi.array().required(),
});



exports.getUserById = (req, res) => {
  return models.getUserById(req, res);
};

exports.getCommercants = (req, res) => {
  return models.getCommercants(req, res);
};

exports.getClients = (req, res) => {
  return models.getClients(req, res);
};

exports.addUser = (req, res) => {
  return models.addUser(req, res, userAddSchema);
};

exports.removeUser = (req, res) => {
  return models.removeUser(req, res);
};

exports.editUser = (req, res) => {
  return models.editUser(req, res, userEditSchema);
};

exports.connexionUser = (req, res) => {
  return models.connexionUser(req, res);
};
