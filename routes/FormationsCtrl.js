//routes
var models = require('../models')
var jwtUtils = require('../utils/jwt.utils')

module.exports = {

   //recup toutes les formations
   getF: (req, rep) => {
      models.Formations.findAll({
            attributes: ['id', 'titre', 'discr', 'img', 'idUser']
         })
         .then(formations => {
            return rep.status(200).json(formations)
         })
         .catch(err => {
            return rep.status(500).json({
               'error': 'formations non trouvé'
            })
         })
   },
   //recup une formation grave au id
   getOneF: (req, rep) => {
      let idF = req.params.idF;

      models.Formations.findOne({
            attributes: ['id', 'titre', 'discr', 'img', 'idUser', 'createdAt'],
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
      if (userId < 0) {
         rep.status(400).json({
            'error': "wrong token"
         })
      }

      let titre = req.titre
      let discr = req.discr
      let img = "c.png"
      let idUser = 1

      models.Formations.create({
            titre: titre,
            discr: discr,
            img: img,
            idUser: idUser
         })
         .then(formations => {
            return rep.status(200).json(formations.id)
         })
         .catch(err => {
            return rep.status(500).json({
               'error': 'formations non crée \n' + err
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
               id: idF
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