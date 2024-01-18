const nano = require("nano")(
  "https://couchdb-fabien-hombert.alwaysdata.net:6984"
);

const db = nano.db.use("fabien-hombert_boutiques");
const dbProduits = nano.db.use("fabien-hombert_produits");

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

exports.getProduits = async (req, res) => {
  const query = {
    selector: { _id: req.params.boutique },
    fields: ["produits"],
  };
  const produits = await db.find(query);

  if (!produits) {
    res.status(404).json("Aucun produit trouvé pour cette boutique.");
  } else {
    res.json(produits.docs);
  }
};

exports.getProduitById = async (req, res) => {
  const query = {
    selector: { _id: req.params.produit },
    fields: [],
  };

  const produit = await dbProduits.find(query);

  if (!produit) {
    res.status(404).json("Produit introuvable.");
  } else {
    console.log(query);
    console.log(produit);
    res.json(produit.docs);
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

exports.addProduit = async (req, res, produitAddSchema) => {
  const produit = {
    boutiqueId: req.params.boutiqueId,
    nbOfRating: req.body.nbOfRating,
    nom: req.body.nom,
    prix: req.body.prix,
    quantite: req.body.quantite,
    rating: req.body.rating,
  };

  const { value, error } = produitAddSchema.validate(produit);
  if (error === undefined) {
    await dbProduits.insert(produit);
    res.status(200).json("Produit ajouté avec succès.");
  } else {
    res.json(`Erreur lors de l'ajout du produit': ${error}`);
  }
};

exports.removeBoutique = async (req, res) => {
  const query = {
    selector: { _id: req.params._id },
    fields: ["_id", "_rev"],
  };
  const boutique = await db.find(query);

  if (!boutique) {
    res.status(404).json("Boutique non trouvée.");
  } else {
    await db.destroy(boutique.docs[0]._id, boutique.docs[0]._rev);
    res.status(200).json("Boutique supprimée avec succès.");
  }
};

exports.removeProduit = async (req, res) => {
  const query = {
    selector: { _id: req.params._id },
    fields: ["_id", "_rev"],
  };
  const produit = await db.find(query);

  if (!produit) {
    res.status(404).json("Produit non trouvé.");
  } else {
    await db.destroy(produit.docs[0]._id, produit.docs[0]._rev);
    res.status(200).json("Produit supprimé avec succès.");
  }
};

exports.editBoutique = async (req, res, boutiqueEditSchema) => {
  const query = {
    selector: { _id: req.params._id },
    fields: ["_id", "_rev"],
  };
  const boutiqueToUpdate = await db.find(query);

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

exports.editProduit = async (req, res, produitEditSchema) => {
  const query = {
    selector: { _id: req.params._id },
    fields: ["_id", "_rev"],
  };
  const produitToUpdate = await db.find(query);

  if (!produitToUpdate) {
    res.status(404).json("Produit non trouvé.");
  } else {
    const produit = {
      _id: produitToUpdate.docs[0]._id,
      _rev: produitToUpdate.docs[0]._rev,
      boutiqueId: req.body.boutiqueId,
      nbOfRating: req.body.nbOfRating,
      nom: req.body.nom,
      prix: req.body.prix,
      quantite: req.body.quantite,
      rating: req.body.rating,
    };

    const { value, error } = produitEditSchema.validate(produit);
    if (error === undefined) {
      await db.insert(produit);
      res.status(200).json("Produit modifié avec succès.");
    } else {
      res.json(`Erreur lors de la modification : ${error}`);
    }
  }
};
