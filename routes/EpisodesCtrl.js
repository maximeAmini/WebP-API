//routes
var models = require('../models')

module.exports = {

    //recup toutes les episodes d'une formation
    getE: (req, rep) => {
        let idF = req.params.idF;

        models.episodes.findAll({
                attributes: ['id', 'titre', 'discr', 'url', 'idForm'],
                where: {idForm: idF}
            })
            .then(episodes => {
                return rep.status(200).json(episodes)
            })
            .catch(err => {
                return rep.status(500).json({
                    'error': 'episodes non trouvé'
                })
            })
    },
    //recup un episode grace au id
    getOneE: (req, rep) => {
        let idE = req.params.idE;

        models.episodes.findOne({
                attributes: ['id', 'titre', 'discr', 'url', 'idForm'],
                where: {
                    id: idE
                }
            })
            .then(episode => {
                return rep.status(200).json(episode)
            })
            .catch(err => {
                return rep.status(500).json({
                    'error': 'episode non trouvé'
                })
            })
    },
    //crée une formation
    createE: (req, rep) => {
        let titre = req.titre
        let discr = req.discr
        let url = req.url
        let idForm = 5

        models.episodes.create({
                titre: titre,
                discr: discr,
                url: url,
                idForm: idForm
            })
            .then(episodes => {
                return rep.status(200).json(episodes.id)
            })
            .catch(err => {
                return rep.status(500).json({
                    'error': 'episodes non crée \n' + err
                })
            })
    },
}