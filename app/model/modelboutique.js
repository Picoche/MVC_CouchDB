const nano = require("nano")("https://fabien-hombert:Renouvier66@couchdb-fabien-hombert.alwaysdata.net:6984");

const db = nano.db.use("fabien-hombert_boutiques");


exports.getBoutiques = async (req, res) => {
  const query = {
    selector: {},
    fields: [],
  };
  const boutiques = await db.find(query);
  res.json(boutiques.docs);
};



exports.getBoutiquesByUserId = async (req, res) => {
  const query = {
    selector: { commercantId: req.params.userId },
    fields: [],
  };
  const boutique = await db.find(query);

  if (!boutique) {
    res.status(404).json("Ce commerçant ne possède pas de boutiques.");
  } else {
    res.json(boutique.docs);
  }
};


exports.addBoutique = async (req, res, boutiqueAddSchema) => {
  const boutique = {
    commercantId: req.body.commercantId,
    adresse: req.body.adresse,
    nbOfRating: req.body.nbOfRating,
    nom: req.body.nom,
    numTel: req.body.numTel,
    openDays: req.body.openDays,
    rating: req.body.rating,
    produits: req.body.produits,
    categorieId: req.body.categorieId,
  };

  const { value, error } = boutiqueAddSchema.validate(boutique);
  if (error === undefined) {
    await db.insert(boutique);
    res.status(200).json("Boutique ajoutée avec succès.");
  } else {
    res.json(`Erreur lors de l'ajout de la boutique': ${error}`);
  }
};


exports.removeBoutique = async (req, res) => {
    const query = {
        selector: { "_id": req.params._id },
        fields: ["_id", "_rev"]
    }
    const boutique = await db.find(query)

  if (!boutique) {
    res.status(404).json("Boutique non trouvée.");
  } else {
    await db.destroy(boutique.docs[0]._id, boutique.docs[0]._rev);
    res.status(200).json("Boutique supprimée avec succès.");
  }
};


exports.editBoutique = async (req, res, boutiqueEditSchema) => {
    const query = {
        selector: { "_id": req.params._id },
        fields: ["_id", "_rev"]
    }
    const boutiqueToUpdate = await db.find(query)

  if (!boutiqueToUpdate) {
    res.status(404).json("Boutique non trouvée.");
  } else {
    const boutique = {
      _id: boutiqueToUpdate.docs[0]._id,
      _rev: boutiqueToUpdate.docs[0]._rev,
      commercantId: req.body.commercantId,
      adresse: req.body.adresse,
      nbOfRating: req.body.nbOfRating,
      nom: req.body.nom,
      numTel: req.body.numTel,
      openDays: req.body.openDays,
      rating: req.body.rating,
      produits: req.body.produits,
      categorieId: req.body.categorieId,
    };

    const { value, error } = boutiqueEditSchema.validate(boutique);
    if (error === undefined) {
      await db.insert(boutique);
      res.status(200).json("Boutique modifiée avec succès.");
    } else {
      res.json(`Erreur lors de la modification : ${error}`);
    }
  }
};

