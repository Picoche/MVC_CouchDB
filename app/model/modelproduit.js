const nano = require("nano")("https://fabien-hombert:Renouvier66@couchdb-fabien-hombert.alwaysdata.net:6984");
const dbProduits = nano.db.use("fabien-hombert_produits");
const db = nano.db.use("fabien-hombert_boutiques");

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

  exports.removeProduit = async (req, res) => {
    const query = {
        selector: { "_id": req.params._id },
        fields: ["_id", "_rev"]
    }
    const produit = await db.find(query)
  
    if (!produit) {
        res.status(404).json("Produit non trouvé.")
    } else {
        await db.destroy(produit.docs[0]._id, produit.docs[0]._rev)
        res.status(200).json("Produit supprimé avec succès.")
    }
  }


  exports.editProduit = async (req, res, produitEditSchema) => {
    const query = {
        selector: { "_id": req.params._id },
        fields: ["_id", "_rev"]
    }
    const produitToUpdate = await db.find(query)
  
    if (!produitToUpdate) {
        res.status(404).json("Produit non trouvé.")
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
        }
  
        const { value, error } = produitEditSchema.validate(produit)
        if (error === undefined) {
            await db.insert(produit)
            res.status(200).json("Produit modifié avec succès.")
        } else {
            res.json(`Erreur lors de la modification : ${error}`)
        }
    }
  }
  