//imports
var express = require('express')
var formationsCtrl = require('./routes/FormationsCtrl')
var EpisodesCtrl = require('./routes/EpisodesCtrl')
var UsersCtrl = require('./routes/UsersCtrl')

exports.router = (()=>{
    var apiRouter = express.Router()

    //formations root
    apiRouter.route('/formations').get(formationsCtrl.getF)
    apiRouter.route('/formations/:idF').get(formationsCtrl.getOneF)
    apiRouter.route('/formations').post(formationsCtrl.createF)
    apiRouter.route('/formations/:idF').put(formationsCtrl.setF)
    apiRouter.route('/formations/:idF').delete(formationsCtrl.deleteF)

    //episodes root
    apiRouter.route('/episodes/:idF').get(EpisodesCtrl.getE)
    apiRouter.route('/episodes/one/:idE').get(EpisodesCtrl.getOneE)
    apiRouter.route('/episodes/:idF').post(EpisodesCtrl.createE)

    //login
    apiRouter.route('/users/login').post(UsersCtrl.login)
    apiRouter.route('/users/register').post(UsersCtrl.register)


    return apiRouter
})()