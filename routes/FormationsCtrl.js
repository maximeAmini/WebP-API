//routes
var models = require('../models')
var jwtUtils = require('../utils/jwt.utils')

module.exports = {
   //recup toutes les formations
   getF: (req, rep) => {
      models.Formations.findAll({
            attributes: ['id', 'titre', 'discr', 'img']
         })
         .then(formations => {
            return rep.status(200).json(formations)
         })
         .catch((err) => {
            return rep.status(500).json({
               'error': 'Les formations non trouvé'
            })
         })
   },
   //recup une formation grave au id
   getOneF: (req, rep) => {
      let idF = req.params.idF;

      models.Formations.findOne({
            attributes: ['id', 'titre', 'discr', 'img', 'userId', 'createdAt'],
            where: {
               id: idF
            }
         })
         .then(formation => {
            return rep.status(200).json(formation)
         })
         .catch(err => {
            return rep.status(500).json({
               'error': 'formations non trouvé'
            })
         })
   },
   //crée une formation
   createF: (req, rep) => {
      //vérifier le token
      let headerAuth = req.headers['authorization']
      let userId = jwtUtils.getUserId(headerAuth)

      //recup les données envoyé
      let titre = req.body.titre
      let discr = req.body.discr
      let img = "c.jpg"
      //Vérifié les infos
      if(titre=="" || discr==""){
         return rep.status(500).json({
            'type': 1,
            'error': 'Les champs ne doivent pas être vide'
         })  
      }

      //tester si l'uttilisateur est dispo
      models.Users.findOne({
            where: {
               id: userId
            }
         })
         .then((user) => {
            console.log(user)
            if(user){
               models.Formations.create({
                  titre: titre,
                  discr: discr,
                  img: img,
                  UserId: userId
               })
               .then(formations => {
                  return rep.status(200).json(formations.id)
               })
               .catch(err => {
                  return rep.status(500).json({
                     'type': 2,
                     'error': 'Formation non crée une erreur c\'est produite'
                  })
               })
            }else{
               return rep.status(500).json({
                  'type': 3,
                  'error': 'Utilisateur introuvable'
               })
            }
         }).catch(err => {
            return rep.status(500).json({
               'type': 4,
               'error': 'Utilisateur introuvable'
            })
         })
   },
   //modifier une formation
   setF: (req, rep) => {
      //vérifier le token
      let headerAuth = req.headers['authorization']
      let userId = jwtUtils.getUserId(headerAuth)
      if (userId < 0) {
         rep.status(400).json({
            'error': "wrong token"
         })
      }

      let titre = req.titre
      let discr = req.discr
      let img = "c.png"
      let idF = req.params.idF;

      models.Formations.update({
            titre: titre,
            discr: discr,
            img: img,
         }, {
            where: {
               id: idF
            }
         })
         .then(formations => {
            return rep.status(200).json(formations.id)
         })
         .catch(err => {
            return rep.status(500).json({
               'error': 'formations non modifier' + err
            })
         })
   },
   //supprimer une formation
   deleteF: (req, rep) => {
      //vérifier le token
      let headerAuth = req.headers['authorization']
      let userId = jwtUtils.getUserId(headerAuth)
      if (userId < 0) {
         rep.status(400).json({
            'error': "wrong token"
         })
      }

      let idF = req.params.idF;

      models.Formations.destroy({
            where: {
               id: idF,
               userId: userId
            }
         })
         .then(() => {
            return rep.status(200).json({
               'rep': 'supprimé avec succes'
            })
         })
         .catch(err => {
            return rep.status(500).json({
               'error': 'non supprimé'
            })
         })
   }
}