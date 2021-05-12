//imports
var app = require('express')()
var cors = require('cors')
var bodyParser = require('body-parser')
var apiRouter = require('./apiRouter').router

//configuration
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//router
app.use('/',apiRouter)

//lancer le serverus
app.listen(4000, ()=>{console.log('L\'API écoute sur le port 4000')})