const express = require("express");
const routerUser = express.Router();

const controllers = require("../controller/controlleruser");

routerUser.get("/user/:user", (req, res) => {
    controllers.getUserById(req, res);
  });

  routerUser.get("/user/commercants", (req, res) => {
    controllers.getCommercants(req, res);
  });

  routerUser.get("/user/clients", (req, res) => {
    controllers.getClients(req, res);
  });

  routerUser.post("/user", (req, res) => {
    controllers.addUser(req, res);
  });

  routerUser.delete("/user", (req, res) => {
    controllers.removeUser(req, res);
  });

  routerUser.post("/connexion", (req, res) => {
    controllers.connexionUser(req, res);
  });

  module.exports = { routerUser };