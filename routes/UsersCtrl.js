//imports
var bcrypt = require('bcrypt')
var jwtUtils = require('../utils/jwt.utils')
var models = require('../models')

//routes
module.exports = {
   register: (req, rep) => {
      //param
      var userName = req.body.userName
      var pass = req.body.pass
      //tests
      if (userName == null || pass == null) {
         return rep.status(400).json({
            'error': 'null'
         })
      }

      // TODO VERIFICATIONS

      //tester s'il existe déja
      models.Users.findOne({
            attributes: ['userName'],
            where: {
               userName: userName
            }
         })
         .then((userFound) => {
            if (!userFound) {
               //hash le password
               bcrypt.hash(pass, 5, (err, passCrypt) => {
                  //crée le user
                  var newUser = models.Users.create({
                        userName: userName,
                        pass: passCrypt
                     })
                     .then((newUser) => {
                        return rep.status(201).json({
                           'userId': newUser.id
                        })
                     })
                     .catch((err) => {
                        return rep.status(500).json({
                           'error': 'canot add user'
                        })
                     })
               })
            } else {
               return rep.status(400).json({
                  'error': 'user existe'
               })
            }
         })
         .catch((err) => {
            return rep.status(500).json({
               'error': 'enable to verify user'
            })
         })
   },
   login: (req, rep) => {
      //param
      var userName = req.body.userName
      var pass = req.body.pass
      //tests
      if (userName == null || pass == null) {
         return rep.status(400).json({
            'error': 'null'
         })
      }

      //tester s'il existe déja
      models.Users.findOne({
            where: {
               userName: userName
            }
         })
         .then((userFound) => {
            if (userFound) {
               //voir si le mot de pass est juste
               bcrypt.compare(pass, userFound.pass, (err, resCrypt) => {
                  if (resCrypt) {
                     //generer le token
                     return rep.status(200).json({
                        'userId': userFound.id,
                        'token': jwtUtils.generateTokenForUser(userFound)
                     })
                  } else {
                     return rep.status(403).json({
                        'error': 'Mot de passe invalide'
                     })
                  }
               })
            } else {
               return rep.status(400).json({
                  'error': 'L\'utilisateur n\'éxiste pas'
               })
            }
         })
         .catch((err) => {
            return rep.status(500).json({
               'error': 'enable to verify user'
            })
         })

   },
   getU: (req, rep) => {
      let headerAuth = req.headers['authorization']
      let userId = jwtUtils.getUserId(headerAuth)
      if (userId < 0) {
         rep.status(400).json({
            'error': "wrong token"
         })
      }
   }
}