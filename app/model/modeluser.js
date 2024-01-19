const nano = require("nano")("https://fabien-hombert:Renouvier66@couchdb-fabien-hombert.alwaysdata.net:6984");
const dbUser = nano.db.use("fabien-hombert_users");

  exports.getUserById = async (req, res) => {
    const query = {
      selector: { _id: req.params.user },
      fields: [],
    };
    const user = await dbUser.find(query);
  
    if (!user) {
      res.status(404).json("Cet utilisateur n'existe pas");
    } else {
      res.json(user.docs);
    }
  };

  exports.getCommercants = async (req, res) => {
    const query = {
      selector: {estCommercant: true},
      fields: [],
    };
    const commercant = await dbUser.find(query);
    
    if (!commercant) {
      res.status(404).json("Il n'y a pas de comptes commerçant");
    } else {
      res.json(commercant.docs);
      console.log(`le commerçant : ${commercant}`);
    }
  };

  exports.getClients = async (req, res) => {
    const query = {
      selector: {estCommercant: false},
      fields: [],
    };
    const client = await dbUser.find(query);
  
    if (!client) {
      res.status(404).json("Il n'y a pas de comptes client");
    } else {
      res.json(client.docs);
    }
  };

  exports.addUser = async (req, res, userAddSchema) => {
    const user = {
      email: req.body.email,
      hash: req.body.hash,
      estCommercant: req.body.estCommercant,
      fullName: req.body.fullName,
      profilePicture: req.body.profilePicture,
      pseudo: req.body.pseudo,
      ownedShops: req.body.ownedShops,
    };
  
    const { value, error } = userAddSchema.validate(user);
    if (error === undefined) {
      await dbUser.insert(user);
      res.status(200).json("Utilisateur ajouté avec succès.");
    } else {
      res.json(`Erreur lors de l'ajout de l'utilisateur'': ${error}`);
    }
  };


  exports.removeUser = async (req, res) => {
    const query = {
        selector: { "_id": req.params._id },
        fields: ["_id", "_rev"]
    }
    const user = await db.find(query)

  if (!user) {
    res.status(404).json("Utilisateur non trouvé");
  } else {
    await db.destroy(user.docs[0]._id, user.docs[0]._rev);
    res.status(200).json("Utilisateur supprimé avec succès.");
  }
};


exports.editUser = async (req, res, userEditSchema) => {
    const query = {
        selector: { "_id": req.params._id },
        fields: ["_id", "_rev"]
    }
    const userToUpdate = await db.find(query)

  if (!userToUpdate) {
    res.status(404).json("Utilisateur non trouvé");
  } else {
    const user = {
      _id: userToUpdate.docs[0]._id,
      _rev: userToUpdate.docs[0]._rev,
      email: req.body.email,
      hash: req.body.hash,
      estCommercant: req.body.estCommercant,
      fullName: req.body.fullName,
      profilePicture: req.body.profilePicture,
      pseudo: req.body.pseudo,
      ownedShops: req.body.ownedShops,
    };

    const { value, error } = userEditSchema.validate(user);
    if (error === undefined) {
      await dbUser.insert(user);
      res.status(200).json("Utilisateur modifié avec succès.");
    } else {
      res.json(`Erreur lors de la modification : ${error}`);
    }
  }
};

exports.connexionUser = async (req, res) => {
  const { email, hash } = req.body;

  try {
      const user = await dbUser.find({ selector: { email }, limit: 1 });

      if (!user.docs||user.docs.length == 0) {
          return res.status(401).json({ message: 'email ou mot de passe incorrect' });
      }

      if (hash !== user.docs[0].hash) {
          return res.status(401).json({ message: 'email ou mot de passe incorrect' });
      }


      res.status(200).json({ message: 'Connexion réussie!' });
  } catch (error) {
      console.error("Erreur:", error);
      res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};



  
 